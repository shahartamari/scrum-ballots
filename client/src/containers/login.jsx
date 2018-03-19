import React from "react";
import { connect } from "react-redux";
import * as actions from '../actions';

const Login = ({ dispatch, visible }) => {
  dispatch(actions.currentUser());
  return (
    <span >
      <a style={{display:visible}} href="/login">Login</a>
    </span>
  );
};



export default connect()(Login);
