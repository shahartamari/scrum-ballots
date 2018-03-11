import { VOTE, RESET_VOTES, NEW_SESSION } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case VOTE:
      return [...state.filter(e=>{return e.voteCast.id !== action.voteCast.id}), action];
    case RESET_VOTES:
    case NEW_SESSION:
      state = [];
      return state;
    default:
      return state;
  }
};
