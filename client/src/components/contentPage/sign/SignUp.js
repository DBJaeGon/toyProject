import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchSignUp } from '_reducer/userReducer';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { currentLoc } from '_reducer/HeaderNavReducer';

const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16}
    }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 12,  offset: 6}
  }
};

const SignUp = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();

    const onFinish = async(values) => {
        try {
            const {lastName, firstName, email, password} = values;
            const result = await dispatch(fetchSignUp({lastName, firstName, email, password}));
            const signUpResult = unwrapResult(result);
            if(signUpResult) {
                history.push('/signIn');
                await dispatch(currentLoc("/signIn"));
                message.success("로그인 해주세요!");
            }
        } catch (error) {
            message.error(error.message);
        }
    };



    return (
        <Row justify="center" align="middle">
            <Col className="header-shadow" span="15" style={{ backgroundColor: "#fff"}}>
              <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
                className="signUp-form"
              >
              
                  <Form.Item
                      name="lastName"
                      label="lastName"
                      rules={[{
                          required: true,
                          message: 'Please input your lastName!',
                          whitespace: true,
                      }]}
                  >
                      <Input />
                  </Form.Item>
                    
                  <Form.Item
                      name="firstName"
                      label="firstName"
                      rules={[{
                          required: true,
                          message: 'Please input your firstName!',
                          whitespace: true,
                      }]}
                  >
                      <Input />
                  </Form.Item>
                    
                    
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item
                  name="password"
                  label="Password"
                  tooltip={`- 최소 8글자 ~ 최대 20글자, 대문자, 소문자, 특수문자를 적어도 1글자씩 포함해야합니다.`}
                  rules={[
                    {
                      required: true,
                      min: 8,
                      max: 20,
                      message: 'Please input your password!',
                      pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
                    },
                ]}
                >
                  <Input.Password />
                </Form.Item>
                
                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                      
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit"  className="signUp-form-button">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Col>
        </Row>
    );
};

export default SignUp;