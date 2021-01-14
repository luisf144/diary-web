import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";

function LeftMenu(props) {
  const user = useSelector(state => state.user);

  return (
    <Menu mode={props.mode}>
    {
      user.userData && user.userData.isAdmin ? 
        (
          <Menu.Item key="home">
            <a href="/images">Images</a>
          </Menu.Item>
        ): null
    }
   
  </Menu>
  )
}

export default LeftMenu