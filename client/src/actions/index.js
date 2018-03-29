import axios from "axios";

import {
  JOIN,
  VOTE,
  NEW_SESSION,
  RESET_VOTES,
  CLEAR_USERS,
  RESET,
  CURRENT_PROFILE,
  LOGOUT
} from "./types";

export const join = (id, name) => {
  return { type: JOIN, id, name };
};
export const vote = voteCast => {
  return { type: VOTE, voteCast };
};
export const newSession = (session, name, secret) => {
  return { type: NEW_SESSION, session, name, secret };
};
export const resetVote = () => {
  return { type: RESET_VOTES };
};
export const clearUsers = () => {
  return { type: CLEAR_USERS };
};
export const reset = () => {
  return { type: RESET };
};
// we are using react-thunk to allow async responses
export const logout = () => async dispatch => {
  const res = await axios.get("/api/logout");
  dispatch({ type: LOGOUT });
  setTimeout(() => {
    // since logout is async wait before moving on
    window.location = res.data;
  }, 1000);
};
export const currentUser = () => async dispatch => {
  const res = await axios.get("/api/getUser");
  dispatch({
    type: CURRENT_PROFILE,
    profile: res.data === "" ? null : res.data
  });
};
