import { JOIN, NEW_SESSION } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case JOIN:
      return [
        ...state.filter(user => {
          return user.id !== action.id;
        }),
        action
      ];
    case NEW_SESSION: {
      state = [];
      return state; // clear voter list on new session
    }
    default:
      return state;
  }
};
