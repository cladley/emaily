import { FETCH_SURVEYS, EDIT_SURVEY } from "../actions/types";

const initialState = {
  surveys: [],
  editSurvey: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, surveys: action.payload };
    case EDIT_SURVEY:
      const survey = { ...action.payload };
      survey.recipients = survey.daftRecipients;
      return { ...state, editSurvey: survey };
    default:
      return state;
  }
}
