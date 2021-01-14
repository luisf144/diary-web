import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

function CoverCard({ id, url, handleDeleteClick }) {
  
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
    ]}
  >
    <Meta
      title={`Image #${id}`}
      description="Click to see details."
    />
  </Card>
  )
}

export default CoverCard