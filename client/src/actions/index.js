import { FETCH_USER } from "./types";

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
