import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser, loginUser } from "../../actions/user.actions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Notification from '../Notification/Notification';

import {
  Form,
  Input,
  Button,
  Typography
} from 'antd';

const {Title} = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AuthForm = props => {
    const dispatch = useDispatch();
    const formType = props.formType;
    const history = useHistory();

    const [notification, setNotification] = useState({
      type: '',
      description: ''
    });

    const onChangeNotification = (type, description) => {
      const notification = {
        type,
        description
      }
      
      setNotification(notification);
  };

    const validationObj = {
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .matches(
            new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
             'Password must match the requirements'
          )
          .required('Password is required'),
      };

      if(formType === 'register'){
          validationObj.confirmPassword = Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required');
      }
    
    return (
        <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape(validationObj)}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          const data = {
            email: values.email,
            password: values.password,
            role: 1
          };

          if(formType === 'login'){
            dispatch(loginUser(data))
            .then(response => {
                if (response.payload.data.loggedIn) {
                    history.push('/');
                } else {
                  onChangeNotification('error', "Check out your email or password again'");
                }
            })
            .catch(err => {
              onChangeNotification('error', "Check out your email and password again");
            });
          }else{
            dispatch(registerUser(data))
            .then(response => {
                if (response.payload.data.registered) {
                  onChangeNotification('success', "User registered successfully!");

                  history.push("/login");
                } else {
                  onChangeNotification('error', "Error registering user.");
                }
              })
          }

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

        return (
          <div className="container">
            <Title level={2}>{ formType === 'login' ? 'Sign in' : 'Sign up'}</Title>
            <Form style={{ minWidth: '475px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item required label="Email" >
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item 
                required 
                label="Password" 
                extra={formType === 'register' ? "Must be 8 characters, at least 1 capital letter and 1 special character." : null} 
              >
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {
                  formType === 'register' ?
                    (
                        <Form.Item required label="Confirm" hasFeedback>
                            <Input
                            id="confirmPassword"
                            placeholder="Re-enter password to confirm"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                            }
                            />
                            { errors.confirmPassword && touched.confirmPassword && (
                                <div className="input-feedback">{errors.confirmPassword}</div>
                            )}
                        </Form.Item>
                    ): null
              }
            

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>

            {
                notification.type ?
                (
                    <Notification type={notification.type} description={notification.description}/>
                ): null
              }
          </div>
        );
      }}
    </Formik>
    );
}

export default AuthForm;