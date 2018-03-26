import { JOIN, NEW_SESSION, RESET, LOGOUT } from "../actions/types";

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
    case LOGOUT:
      return []; // clear voter list on new session

    default:
      return state;
  }
};
