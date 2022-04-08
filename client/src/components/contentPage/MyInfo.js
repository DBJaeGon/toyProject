import React from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Row, Col, Modal, message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 12, offset: 6 },
  },
};

const MyInfo = () => {
  const userInfo = useSelector((state) => state.user.authState.userInfo);
  const [mode, setMode] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const onFinish = async ({ firstName, lastName, password }) => {
    try {
      let updateUser;
      if (password) {
        updateUser = { firstName, lastName, password };
      } else {
        updateUser = { firstName, lastName };
      }
      const result = await axios.post("/api/users/updateInfo", updateUser);
      if (result.data) {
        handleMode();
      }
    } catch (error) {
      console.log(error);
      // message.error(error);
    }
  };

  const handleMode = (e) => {
    // e.preventDefault();
    setMode((prev) => !prev);
    form.setFieldsValue({
      password: "",
      confirm: "",
    });
  };

  const showModal = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPassword("");
    form.setFieldsValue({
      confirmPassword: "",
    });
    setVisible(false);
  };

  const onConfirmPassword = async (e) => {
    try {
      setLoading(true);
      const result = await axios.post("/api/users/confirmPassword", { password });
      if (result.data) {
        setMode((prev) => !prev);
      } else {
        message.error("올바르지 않은 비밀번호입니다.");
      }
      setPassword("");
      form.setFieldsValue({
        confirmPassword: "",
      });
      setLoading((prev) => !prev);
      setVisible((prev) => !prev);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handelPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      });
    }
  }, [form, userInfo]);

  return (
    <Row justify="center" align="middle">
      <Col className="header-shadow" span="15" style={{ backgroundColor: "#fff" }}>
        <Form
          {...formItemLayout}
          form={form}
          name="update"
          onFinish={onFinish}
          scrollToFirstError
          className="signUp-form"
        >
          <Form.Item
            name="lastName"
            label="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastName!",
                whitespace: true,
              },
            ]}
          >
            <Input disabled={mode} />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstName!",
                whitespace: true,
              },
            ]}
          >
            <Input disabled={mode} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            tooltip={`- 최소 8글자 ~ 최대 20글자, 대문자, 소문자, 특수문자를 적어도 1글자씩 포함해야합니다.`}
            rules={[
              {
                required: false,
                min: 8,
                max: 20,
                message: "Please input your password!",
                pattern: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/,
              },
            ]}
          >
            <Input.Password disabled={mode} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback={!mode}
            rules={[
              {
                required: false,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password disabled={mode} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {mode ? (
              <Button type="primary" className="signUp-form-button" onClick={showModal}>
                Change
              </Button>
            ) : (
              <Row>
                <Col span={12} pull={0}>
                  <Button type="primary" className="signUp-form-button" onClick={handleMode}>
                    Cancel
                  </Button>
                </Col>
                <Col span={12} push={1}>
                  <Button type="primary" htmlType="submit" className="signUp-form-button">
                    Update
                  </Button>
                </Col>
              </Row>
            )}
          </Form.Item>
        </Form>
      </Col>
      <Modal
        visible={visible}
        title="confirm password"
        onOk={onConfirmPassword}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={onConfirmPassword}>
            Submit
          </Button>,
        ]}
      >
        <Form name="confirmPassword" form={form}>
          <Form.Item
            name="confirmPassword"
            label="Password"
            tooltip={`- 최소 8글자 ~ 최대 20글자, 대문자, 소문자, 특수문자를 적어도 1글자씩 포함해야합니다.\n
                        - social login의 경우 password는 email입니다.`}
          >
            <Input.Password value={password} onChange={handelPassword} />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default MyInfo;
