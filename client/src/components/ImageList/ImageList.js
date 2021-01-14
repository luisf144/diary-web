import React from 'react';
import { List, Space } from 'antd';
import { StarOutlined, FieldTimeOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ImageList({ listData }){
    return(
      <List
        itemLayout="vertical"
        size="large"
        dataSource={listData}
        renderItem={(item, i) => (
          <List.Item
            key={item.i}
            actions={[
              <IconText icon={StarOutlined} text={`Score: ${item.score}`} key="list-vertical-star-o" />,
              <IconText icon={FieldTimeOutlined} text={new Date(item.createdAt).toLocaleString()} key="list-vertical-star-o" />
            ]}
            extra={
              <img
                width={272}
                alt={"img-"+i}
                src={item.imgPath}
              />
            }
          >
        
            {item.comment}
          
          </List.Item>
        )}
      />
    );

}

export default ImageList;