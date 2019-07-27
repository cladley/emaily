import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, editSurvey } from "../../actions";
import { Link, withRouter } from "react-router-dom";

class SurveyList extends Component {
  componentDidMount() {
    fetchSurveys()(this.props.dispatch);
    // this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>

            {survey.status === "Published" && (
              <span className="badge badge--published">Published</span>
            )}

            {survey.status === "Draft" && (
              <>
                <span className="badge badge--draft">Draft</span>
                <button
                  className="waves-effect waves-light btn-small"
                  onClick={() => {
                    this.props.dispatch(editSurvey(survey));
                    this.props.history.push("/surveys/edit");
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>

          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

const mapStateToProps = state => {
  return { surveys: state.surveys.surveys };
};

export default withRouter(connect(mapStateToProps)(SurveyList));
