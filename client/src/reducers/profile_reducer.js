import { CURRENT_PROFILE, RESET, LOGOUT } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case CURRENT_PROFILE:
      const p = action.profile;
      if (!p) {return null;}
      return {
        sub: p.sub,
        upn: p.upn,
        displayName: p.displayName,
        name: p.name
      };
    case RESET:
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
