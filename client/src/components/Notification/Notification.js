import React, { useEffect } from 'react';
import { notification } from 'antd';

function Notification({ type, title, description }) {
    useEffect(()=>{
        openNotification(type);
    }, []);
  
    const openNotification = type => {
        notification[type]({
          message: title ? title : 'Notification:',
          description: description,
        });
      };    

  return (<></>)
}

export default Notification