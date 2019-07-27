const mongoose = require("mongoose");
const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", async (req, res) => {
    // const surveys = await Survey.find({ _user: req.user.id }).select({
    //   recipients: false
    // });

    const surveys = await Survey.find({ _user: req.user.id });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveryId/:choice");
    _.chain(req.body)
      .map(event => {
        const match = p.test(new URL(event.url).pathname);

        if (match)
          return {
            email: event.email,
            surveyId: match.surveyId,
            choice: match.choice
          };
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, status } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      daftRecipients: recipients,
      _user: req.user.id,
      dateCreated: Date.now(),
      status
    });

    try {
      if (status === "Published") {
        survey.recipients = recipients
          .split(",")
          .map(email => ({ email: email.trim() }));
        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();
        survey.dateSent = Date.now();
        req.user.credits -= 1;
      }

      await survey.save();
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
