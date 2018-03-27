//-----------------------------------------------------------------------------------------------------
// this components routes to a leave requst
// it signals to Socket IO to leave the room, clears the store 
// and redirects back to home page
//-----------------------------------------------------------------------------------------------------

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reset } from "../../actions";

const Leave = ({dispatch, socket, user, session, history}) => {
    console.log(socket);
  socket.emit("LEAVE", { user, session });
  dispatch(reset());
  history.replace("/");
  return <div>Goodbye</div>;
};
const mapStateToProps = ({ users, session }) => {
  return { user: users.length > 0 ? users[0] : null, session };
};
export default withRouter(connect(mapStateToProps)(Leave));
