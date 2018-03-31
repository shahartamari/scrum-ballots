import { VOTE, RESET_VOTES, NEW_SESSION, RESET, LOGOUT } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return [...state.filter(e=>{return e.voteCast.id !== action.voteCast.id}), action.voteCast];
    case RESET_VOTES:
    case NEW_SESSION:
    case RESET:
    case LOGOUT:
      return [];
    default:
      return state;
  }
};
