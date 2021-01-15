import React from 'react';
import { Comment, List } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

function NotificationList({ data, handleClickAction }) {
  const actionsHandler = (item) => {
    const actions = [
      <span 
        key="go-to" 
        onClick={() => handleClickAction(item)}>
          See more
      </span>
    ];

    return actions;
  };

    return (
        <List
        className="notification-list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <li>
            <Comment
              avatar={
                <NotificationOutlined/>
              }
              actions={actionsHandler(item)}
              content={item.message}
            />
          </li>
        )}
      />
    )
  }
  
  export default NotificationList;