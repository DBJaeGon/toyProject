import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Form, Input, Button } from "antd";
import { MessageOutlined, EnterOutlined } from "@ant-design/icons";
import io from "socket.io-client";

const socket = io("/", { path: "/api/chat" });

const ChatForm = () => {
  const date = new Date();
  const user = useSelector((state) => state.user.authState.userInfo);
  // const [socket, setSocket] = useState();
  const [chatMessage, setChatMessage] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    // setSocket(i  o("/", { path: "/api/chat" }));
    socket.on("sendMsg", (msg) => {
      console.log(msg);
    });
  }, []);

  const handleMsgChange = (e) => {
    const value = e.target.value;
    setChatMessage(value);
  };

  const submitChatMsg = () => {
    const userId = user.id;
    const userName = user.lastName + " " + user.firstName;
    const currentTime = date.toLocaleDateString();
    const type = "Image";
    socket.emit("chatMsg", {
      chatMessage,
      userId,
      userName,
      currentTime,
      type,
    });
    setChatMessage("");
  };

  return (
    <Row>
      <Form layout="inline" form={form} onFinish={submitChatMsg} style={{ width: "100%" }}>
        <Col offset={3} span={14}>
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
