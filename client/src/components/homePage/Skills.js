import React from "react";
import { Card, Row, Col } from "antd";

const Skills = () => {
  return (
    <Row justify="space-between" style={{ width: "100%", marginTop: "50px" }}>
      <Col span={7}>
        <Card
          title="BackEnd"
          style={{ width: "250px", boxShadow: "2px 2px 20px 1px rgba(114, 46, 209, 0.2)" }}
        >
          Express <br />
          MySQL (sequelize)
        </Card>
      </Col>
      <Col span={7}>
        <Card
          title="FrontEnd"
          style={{ width: "250px", boxShadow: "2px 2px 20px 1px rgba(114, 46, 209, 0.2)" }}
        >
          React.js <br />
          Redux <br />
          Vue.js
        </Card>
      </Col>
      <Col span={7}>
        <Card
          title="Etc"
          style={{ width: "250px", boxShadow: "2px 2px 20px 1px rgba(114, 46, 209, 0.2)" }}
        >
          Linux <br />
          Socket.io <br />
          AWS <br />
          firebase <br />
          Git
        </Card>
      </Col>
    </Row>
  );
};

export default Skills;
