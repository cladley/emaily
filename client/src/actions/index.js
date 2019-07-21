import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => {
  return async function(dispatch) {
    const res = await fetch("/api/current_user");
    let payload = await res.text();
    payload = payload ? JSON.parse(payload) : "";
    dispatch({ type: FETCH_USER, payload: payload });
  };
};

export const handleToken = token => async dispatch => {
  const res = await fetch("/api/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(token)
  });
  let payload = await res.text();
  payload = JSON.parse(payload);
  dispatch({ type: FETCH_USER, payload: payload });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await fetch("/api/surveys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  let payload = await res.text();
  payload = JSON.parse(payload);
  dispatch({ type: FETCH_USER, payload: payload });
  history.push("/surveys");
};

export const fetchSurveys = () => {
  return async function(dispatch) {
    const res = await fetch("/api/surveys");
    let payload = await res.text();
    payload = payload ? JSON.parse(payload) : "";

    dispatch({ type: FETCH_SURVEYS, payload });
  };
};
