import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMainImage } from "_reducer/imageReducer";
import Introduce from "../homePage/Introduce";
import AboutMe from "../homePage/AboutMe";
import Skills from "../homePage/Skills";
import { Row, Typography } from "antd";

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMainImage());
  }, [dispatch]);

  return (
    <Row justify="center" style={{ maxWidth: "130vh", margin: "0 auto" }}>
      <Row>
        <Introduce />
      </Row>
      <Row justify="center" style={{ marginTop: "150px" }}>
        <Title>About Me</Title>
        <AboutMe />
      </Row>
      <Row justify="center" style={{ marginTop: "150px" }}>
        <Title>Skills</Title>
        <Skills />
      </Row>
      {/* {imageInfo.length ? (
        imageInfo.map((image) => {
          return (
            <Row key={image.uid} justify="center" style={{ marginBottom: "20px" }}>
              <Col>
                <Image src={image.url} />
              </Col>
            </Row>
          );
        })
      ) : (
        <Empty description="No Image" />
      )} */}
    </Row>
  );
};

export default Home;
