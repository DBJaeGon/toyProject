import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../../_reducer/imageReducer";
import { Image, Row, Col, Empty, Divider, Card } from "antd";
import Meta from "antd/lib/card/Meta";

const Images = () => {
  const imageInfo = useSelector((state) => state.image.images.imageInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <Row justify="center">
      {imageInfo.length ? (
        imageInfo.map((image, index) => {
          return (
            <>
              <Col>
                <Card
                  style={{ width: "600px" }}
                  hoverable
                  cover={
                    <Image
                      src={image.url}
                      preview={{ mask: false }}
                      style={{ borderBottom: "1px solid #f0f0f0" }}
                    />
                  }
                >
                  <Meta title={image.name} />
                </Card>
              </Col>
              {index === imageInfo.length - 1 ? "" : <Divider style={{ borderColor: "#e9d9ff" }} />}
            </>
          );
        })
      ) : (
        <Empty description="No Image" />
      )}
    </Row>
  );
};

export default Images;
