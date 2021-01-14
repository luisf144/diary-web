import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';

function PostForm({ initVal, onHandleSubmit }) {
  
    const onFinish = (values) => {
       onHandleSubmit(values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
        <Form
        style={{ padding: 20 }}
        layout="vertical"
        name="form-post"
        initialValues={initVal}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
    >
    <Form.Item
        label="Comment"
        name="comment"
    >
        <Input maxLength={100} />
    </Form.Item>

    <Form.Item
        label="Score"
        name="score"
        rules={[
        {
            required: true,
            message: 'Please enter your score!',
        },
        ]}
    >
        <InputNumber min={0} max={10} />
    </Form.Item>



    <Form.Item >
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
    </Form.Item>
    </Form>   
  )
}

export default PostForm