import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { MessageOutlined, EnterOutlined } from "@ant-design/icons";

const ChatForm = ({ socket, makeChat }) => {
  const [chatMessage, setChatMessage] = useState("");
  const [form] = Form.useForm();

  const handleMsgChange = (e) => {
    const value = e.target.value;
    setChatMessage(value);
  };

  const submitChatMsg = () => {
    if (!chatMessage) return;
    socket.emit("chatMsg", makeChat(chatMessage, "txt"));
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
