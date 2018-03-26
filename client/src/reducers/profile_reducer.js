import { CURRENT_PROFILE, RESET, LOGOUT } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case CURRENT_PROFILE:
      return action.profile;
    case RESET:
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
