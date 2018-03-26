import { NEW_SESSION, RESET, LOGOUT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case NEW_SESSION:     
      return { id: action.session, name: action.name, secret: action.secret };
    case RESET:
      return { };
    case LOGOUT:
      return { path: action.payload};
    default:
      return state;
  }
};
