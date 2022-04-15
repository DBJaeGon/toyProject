import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Typography, Image, Button, Modal } from "antd";

const { Title, Paragraph } = Typography;

const buttonStyle = { marginLeft: "10px", borderRadius: "30px" };

const Introduce = () => {
  const [isVisible, setIsVisible] = useState(false);
  const imageInfo = useSelector((state) => state.image.main.imageInfo);

  const handleClick = () => {
    setIsVisible((show) => !show);
  };

  const handleOk = () => {
    setIsVisible((show) => !show);
  };

  const handleCancel = () => {
    setIsVisible((show) => !show);
  };

  const handleGitPage = () => {
    window.open("https://github.com/DBJaeGon/toyProject", "_blank");
  };

  return (
    <Row justify="center" style={{ width: "100%" }}>
      <Col span={13}>
        <Typography>
          <Title level={2}>Introduce</Title>
          <Paragraph>
            이곳은 CMS을 구현하기 위해 개발중인 웹 애플리케이션입니다!
            <br /> 편하게 구경해주세요!
          </Paragraph>
          <Paragraph>
            여기서 사용한 기술과 코드는 아래 버튼을 클릭해 확인해 보실 수 있습니다.
          </Paragraph>
          <Paragraph>
            <Button type="primary" onClick={handleClick}>
              확인
            </Button>
            <Modal title="List" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>Node (Express)</p>
              <p>React, Redux</p>
              <p>MySql</p>
              <p>Socket.io</p>
              <p>AWS (EC2, RDS, S3, CodeDeploy)</p>
              <p>Git, GitAction</p>
              <p>ant design</p>
            </Modal>
          </Paragraph>
          <Paragraph>
            코드는 여기서 확인할 수 있습니다.
            <Button style={buttonStyle} type="primary" onClick={handleGitPage}>
              Git
            </Button>
          </Paragraph>
        </Typography>
      </Col>
      <Col span={11}>
        {imageInfo.length ? (
          <Image
            preview={false}
            src={imageInfo.filter((image) => image.name.includes("introduce"))[0].url}
            style={{ borderRadius: "5px" }}
          />
        ) : null}
      </Col>
    </Row>
    // <Col>
    //   <Card
    //     title="Profile"
    //     bordered={false}
    //     headStyle={{ fontSize: "25px" }}
    //     style={{ width: 800 }}
    //   >
    //     <p style={{ fontWeight: "600", fontSize: "18px" }}>Birth</p>
    //     <p style={{ marginLeft: "10px" }}>
    //       <span style={{ marginRight: "10px" }}>
    //         <RightOutlined />
    //       </span>
    //       1991년 08월 08일
    //     </p>
    //     <p style={{ fontWeight: "600", fontSize: "18px" }}>Address</p>
    //     <p style={{ marginLeft: "10px" }}>
    //       <span style={{ marginRight: "10px" }}>
    //         <RightOutlined />
    //       </span>
    //       포천시 소흘읍 봉솔로 2길8
    //     </p>
    //     <p style={{ fontWeight: "600", fontSize: "18px" }}>License</p>
    //     <p style={{ marginLeft: "10px" }}>
    //       <span style={{ marginRight: "10px" }}>
    //         <RightOutlined />
    //       </span>
    //       정보처리기사 (2019.08.05)
    //     </p>
    //   </Card>
    // </Col>
  );
};

export default Introduce;
