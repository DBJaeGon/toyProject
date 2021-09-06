import React from 'react';
import {  useSelector } from 'react-redux';
import { Image, Row, Col, Empty } from 'antd';

const Home = () => {

    const imageInfo = useSelector(state => state.image.main.imageInfo);

    return (
      <>
        {
          imageInfo.length ?
          imageInfo.map(image => {
              return (
                <Row justify="center">
                  <Col>
                    <Image key={image.uid} src={image.url} />
                  </Col>
                </Row>
              );
          })
          :
          <Empty description="No Image" />
        }
      </>
    );
};

export default Home;