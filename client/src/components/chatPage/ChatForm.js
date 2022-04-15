import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Input, Button } from "antd";
import { MessageOutlined, EnterOutlined } from "@ant-design/icons";
import moment from "moment";

const ChatForm = ({ socket }) => {
  const user = useSelector((state) => state.user.authState.userInfo);
  const [chatMessage, setChatMessage] = useState("");
  const [form] = Form.useForm();

  const handleMsgChange = (e) => {
    const value = e.target.value;
    setChatMessage(value);
  };

  const submitChatMsg = () => {
    if (!chatMessage) return;
    const userId = user.uid;
    const userName = user.lastName + user.firstName;
    const userImage = user.userImage;
    const sendTime = moment();
    const type = "text";
    socket.emit("chatMsg", {
      chatMessage,
      userId,
      userName,
      userImage,
      sendTime,
      type,
    });
    setChatMessage("");
  };

  return (
    <Row>
      <Form layout="inline" form={form} onFinish={submitChatMsg} style={{ width: "100%" }}>
        <Col span={20}>
          <Input
            id="message"
            prefix={<MessageOutlined />}
            placeholder="Let's start talking"
            value={chatMessage}
            onChange={handleMsgChange}
          />
        </Col>
        <Col span={4}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            icon={<EnterOutlined />}
          ></Button>
        </Col>
      </Form>
    </Row>
  );
};

export default ChatForm;
