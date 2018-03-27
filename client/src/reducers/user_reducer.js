import { JOIN, RESET, LOGOUT, CLEAR_USERS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case JOIN:
      return [
        ...state.filter(user => {
          return user.id !== action.id;
        }),
        {id: action.id, name: action.name}
      ];
    case RESET:  
    case CLEAR_USERS:
    case LOGOUT:
      return []; // clear voter list on new session

    default:
      return state;
  }
};
