import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchSignIn } from '_reducer/userReducer';
import { currentLoc } from '_reducer/HeaderNavReducer';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import GoogleSingIn from './GoogleSingIn';

const SignIn = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();

    const onFinish = async({email, password, remember}) => {
        try {
            if(remember) {
                window.localStorage.setItem('toyEmail', email);
            } else {
                window.localStorage.removeItem('toyEmail');
            }
            const result = await dispatch(fetchSignIn({email, password}));
            const signInState = unwrapResult(result);
            if(signInState.signInSuccess) {
                history.push('/');
                await dispatch(currentLoc(history.location.pathname));
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    // const onGoogleOAuth = async(e) => {
    //     try {
    //         const result = await dispatch(fetchGoogleOAuth());
    //         const googleOAutState = unwrapResult(result);
    //         console.log(googleOAutState)
    //         // if(googleOAutState) {
    //         //     history.push('/');
    //         //     await dispatch(currentLoc('Home'));
    //         // }
    //     } catch (error) {
    //       console.log(error)
    //         // message.error(error);
    //     }
    // };

    // const onGithubOAuth = async() => {
    //   try {
    //     const width = '450';
    //     const height = '600';
    //     const left = Math.ceil((window.screen.width - width)/2);
    //     const top = Math.ceil((window.screen.height - height)/2);
    //     window.open("http://localhost:5000/api/users/github", '_blank', `width=${width}, height=${height}, left=${left}, top=${top}`); 
    //     return false;
    //   } catch (error) {
    //     console.log(error);
    //     message.error(error);
    //   }
    // };

    const handleFindPw = async() => {
      await dispatch(currentLoc('/findPw'));
    };

    useEffect(() => {
        const toyEmail = window.localStorage.getItem("toyEmail");
        if(toyEmail) {
            form.setFieldsValue({
                email: toyEmail
            });
        }
    }, [form]);

    return (
        <Row justify="center" align="middle">
            <Col className="header-shadow" span="15" style={{ backgroundColor: "#fff"}}>
            <Form
              form={form}
              name="normal_login"
              className="signIn-form"
              wrapperCol={{span: 16, offset: 4}}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  }
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
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
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link className="signIn-form-forgot" to='/findPw' onClick={handleFindPw}>Forgot password</Link>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" className="signIn-form-button">
                  Sign In
                </Button>
                <GoogleSingIn />
                {/* <Button type="white" htmlType="button" className="signIn-form-button" onClick={onGoogleOAuth}>
                  <GoogleOutlined style={{fontSize: "16px"}} />Google
                </Button> */}
                {/* <a href="http://localhost:5000/api/users/github"> */}
                <a href="https://jaegon.xyz/api/users/github">
                  <Button type="white" htmlType="button" className="signIn-form-button">
                    <GithubOutlined style={{fontSize: "16px"}} />Github
                  </Button>
                </a>
                <Link to='/signUp' onClick={() => dispatch(currentLoc("/signUp"))}>register now!</Link>
              </Form.Item>
            </Form>

            </Col>
        </Row>
    );
};

export default SignIn;
