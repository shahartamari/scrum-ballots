import { CURRENT_PROFILE, RESET } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case CURRENT_PROFILE:
      return action.profile;
    case RESET:   
      return null;
    default:
      return state;
  }
};
