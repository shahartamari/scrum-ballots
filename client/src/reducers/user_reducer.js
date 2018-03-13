import { JOIN, NEW_SESSION, RESET } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case JOIN:
      return [
        ...state.filter(user => {
          return user.id !== action.id;
        }),
        action
      ];
    case RESET:
    case NEW_SESSION:
      return []; // clear voter list on new session

    default:
      return state;
  }
};
