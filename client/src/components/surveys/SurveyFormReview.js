import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({
  onCancel,
  formValues,
  history,
  submitAction,
  dispatch
}) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  const saveSurvey = () => {
    formValues["status"] = "Draft";
    submitAction(formValues, history)(dispatch);
  };

  const sendSurvey = () => {
    formValues["status"] = "Published";
    submitAction(formValues, history)(dispatch);
  };

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>

      <button
        className="blue btn-flat white-text right"
        onClick={() => saveSurvey()}
      >
        Save
        <i className="material-icons">save</i>
      </button>

      <button
        onClick={() => sendSurvey()}
        className="green btn-flat white-text right"
      >
        Send Survey
        <i className="material-icons">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(withRouter(SurveyFormReview));
