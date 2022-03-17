import React from "react";
import { Image, Row, Col, Typography } from "antd";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

const AboutMe = () => {
  const imageInfo = useSelector((state) => state.image.main.imageInfo);
  // console.log(imageInfo ? "is" : "sin't");
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
            여러 api, 도구들을 사용하면서 document를 보는 것에 익숙지고 있습니다.
            <br /> 코딩을 하면서 가독성이 중요하다고 생각해 깔끔한 코딩을 하려고 하고있습니다.
            <br /> 요즘은 네이밍의 중요성을 다시 깨닫고 있습니다.
          </Paragraph>
          <Paragraph>
            저의 이력서는 Image 페이지의 첫번째 이미지로 올려두었고
            <br /> 두번째 이미지는 현재 이 웹 애플리케이션의 파이프라인 이미지입니다.
          </Paragraph>
        </Typography>
      </Col>
    </Row>
  );
};

export default AboutMe;
