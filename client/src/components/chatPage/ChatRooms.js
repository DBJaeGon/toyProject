import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { TeamOutlined, EnterOutlined } from "@ant-design/icons";

const ChatRooms = () => {
  const [roomName, setRoomName] = useState("");
  const [form] = Form.useForm();

  const handleRoomNameChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setRoomName(value);
  };

  const submitRoomName = (event) => {
    event.preventDefault();
    // reducer로 room list 가져오기 -
    setRoomName("");
  };

  return (
    <Row>
      <Form layout="inline" form={form} onFinish={submitRoomName} style={{ width: "100%" }}>
        <Col offset={3} span={14}>
          <Input
            id="message"
            prefix={<TeamOutlined />}
            placeholder="searching rooms"
            value={roomName}
            onChange={handleRoomNameChange}
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

export default ChatRooms;
