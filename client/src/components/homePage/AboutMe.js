import React from "react";
import { Image, Row, Col, Typography, Button } from "antd";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

const buttonStyle = { marginLeft: "10px", borderRadius: "30px" };

const AboutMe = () => {
  const imageInfo = useSelector((state) => state.image.main.imageInfo);
  // console.log(imageInfo ? "is" : "sin't");

  const handleNotionPage = () => {
    window.open("https://bit.ly/34IEKu4", "_blank");
  };
  const handleResumePage = () => {
    window.open(
      "https://excellent-eyebrow-b8e.notion.site/00c228f669984596874e30fbaa49eec0",
      "_blank"
    );
  };

  return (
    <Row justify="start" style={{ width: "100%", marginTop: "50px" }}>
      <Col span={8}>
        {imageInfo.length ? (
          <Image
            preview={false}
            src={imageInfo.filter((image) => image.name.includes("aboutMe"))[0].url}
            style={{ borderRadius: "5px" }}
          />
        ) : null}
      </Col>
      <Col span={13} offset={3}>
        <Typography>
          <Paragraph>
            안녕하세요. 신입개발자 김재곤입니다.
            <br /> 현재 주로 사용하고 있는 언어는 Javascript이고 Java도 공부하고 있습니다.
          </Paragraph>
          <Paragraph>
            여러가지 middleware를 사용해보고 있고, 배포를 하면서 코딩외적인 부분도 많이 배우고
            있습니다.
            <br /> 빠른 개발을 위해 front로 ant design을 사용하였습니다.
          </Paragraph>
          <Paragraph>
            필요한 정보를 정리해두는 곳입니다.
            <Button style={buttonStyle} type="primary" onClick={handleNotionPage}>
              Notion
            </Button>
          </Paragraph>
          <Paragraph>
            이력서입니다.
            <Button style={buttonStyle} type="primary" onClick={handleResumePage}>
              Resume
            </Button>
          </Paragraph>
        </Typography>
      </Col>
    </Row>
  );
};

export default AboutMe;
