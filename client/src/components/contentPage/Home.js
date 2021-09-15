import React from 'react';
import {  useSelector } from 'react-redux';
import { Image, Row, Col, Empty, PageHeader, Descriptions } from 'antd';

const Home = () => {

    const imageInfo = useSelector(state => state.image.main.imageInfo);

    return (
      <>
        <Row style={{marginLeft: "-40px"}}>
          <Col span="24" push="3">
            <PageHeader
              title="test user list"
            >
              <Descriptions>
                <Descriptions.Item label="admin user">admin@admin.com</Descriptions.Item>
                <Descriptions.Item label="test user">test@test.com</Descriptions.Item>
                <Descriptions.Item label="password">qQ!123456</Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
        {
          imageInfo.length ?
          imageInfo.map(image => {
              return (
                <Row key={image.uid} justify="center">
                  <Col>
                    <Image src={image.url} />
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