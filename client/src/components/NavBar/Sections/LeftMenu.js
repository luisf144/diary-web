import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user);

  return (
    <Menu mode={props.mode}>

          <Menu.Item key="home">
            <a href="/">Home</a>
          </Menu.Item>

    {
      user.userData && user.userData.isAdmin ? 
        (
            <Menu.Item key="images">
              <a href="/images">Images</a>
            </Menu.Item>
        ): null
    }

    {
      user.userData && user.userData.isAdmin ? 
        (
          <Menu.Item key="notifications">
            <a href="/notifications">Notifications</a>
          </Menu.Item>
        ): null
    }
   
  </Menu>
  )
}

export default LeftMenu