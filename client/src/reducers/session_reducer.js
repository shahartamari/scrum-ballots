import { NEW_SESSION } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case NEW_SESSION:
      return { id: action.session, name: action.name, secret: action.secret };

    default:
      return state;
  }
};