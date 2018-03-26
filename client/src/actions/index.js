import axios from "axios";

import {
  JOIN,
  VOTE,
  NEW_SESSION,
  RESET_VOTES,
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

export const reset = () => async dispatch => {
  const res = await axios.get("/api/logout");
  dispatch({ type: RESET, payload: res.data });
};

export const logout = () => {
  return { type: LOGOUT };
};
export const currentUser = () => async dispatch => {

  const res = await axios.get("/api/getUser");
  dispatch({
    type: CURRENT_PROFILE, 
    profile: res.data === "" ? null : res.data
  });
};
