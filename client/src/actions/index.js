import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return async function(dispatch) {
    const res = await fetch("/api/current_user");
    let payload = await res.text();
    payload = payload ? JSON.parse(payload) : '';
    dispatch({ type: FETCH_USER, payload: payload});
  };
};
