import React from 'react';
import { Menu } from 'antd';
import { logout } from '../../../actions/user.actions';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    //Clean the store from user log out
    dispatch(logout()).then(response => {
      //Redirect to login
      props.history.push("/login");
    });
  };

  if (!user.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="login">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="register">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);