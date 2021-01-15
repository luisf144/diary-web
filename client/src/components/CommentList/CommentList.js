import React from 'react';
import { Comment, List } from 'antd';

function CommentList({ data, totalScore }) {
  
    return (
        <List
        className="comment-list"
        header={
            <>
                <span> {data.length} comments </span>
                <span style={{ float: 'right'}}>
                    Avg Score: { totalScore }
                </span>
            </>
        }
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <li>
            <Comment
              author={item.author}
              content={item.content}
              datetime={
                new Date(item.datetime).toLocaleString()
              }
            />
          </li>
        )}
      />
    )
  }
  
  export default CommentList;