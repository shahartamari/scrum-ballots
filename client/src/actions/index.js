import {
  JOIN,
  VOTE,
  NEW_SESSION,
  RESET_VOTES
} from "./types";

export const join = (id, name) => {
  return { type: JOIN, id, name };
};
export const vote = (voteCast) => {
  return { type: VOTE, voteCast };
};
export const new_session = (session, name, secret) => {
  return { type: NEW_SESSION, session, name, secret };
};
export const resetVote = () => {
  return { type: RESET_VOTES };
};
