import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined, CommentOutlined } from '@ant-design/icons';

const { Meta } = Card;

function CoverCard({ id, url, handleDeleteClick, handleDetailsClick }) {
  
  return (
    <Card
    style={{ width: 300, marginBottom: 40 }}
    cover={
      <img
        height={300}
        alt={`img-${id}`}
        src={url}
      />
    }
    actions={[
      <DeleteOutlined key="delete" onClick={() => handleDeleteClick(id)} />,
      <CommentOutlined key="details" onClick={() => handleDetailsClick(id)} />,
    ]}
  >
    <Meta
      title={`Image ${id}`}
      description="Click to see details."
    />
  </Card>
  )
}

export default CoverCard