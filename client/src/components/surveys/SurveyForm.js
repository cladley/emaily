import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SurveyField from "./SurveyField";
import validEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  renderFields() {
    return (
      <div>
        {formFields.map(field => (
          <Field
            key={field.name}
            type="text"
            name={field.name}
            label={field.label}
            component={SurveyField}
          />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validEmails(values.recipients || "");

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

const mapStateToProps = state => {
  return {
    initialValues: state.surveys.editSurvey
  };
};

const surveyReduxForm = reduxForm({
  validate,
  destroyOnUnmount: false,
  form: "surveyForm"
})(SurveyForm);

export default connect(mapStateToProps)(surveyReduxForm);
