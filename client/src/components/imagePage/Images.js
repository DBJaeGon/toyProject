import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../../_reducer/imageReducer";
import { Image, Row, Col, Empty, Divider, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { UploadBtn } from "./UploadBtn";

const Images = () => {
  const imageInfo = useSelector((state) => state.image.images.imageInfo);
  const { result } = useSelector((state) => state.user.signInState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <>
      <Row justify="center">
        {imageInfo.length ? (
          imageInfo.map((image, index) => {
            return (
              <div key={index}>
                <Col>
                  <Card
                    style={{ maxWidth: "120vh" }}
                    hoverable
                    cover={
                      <Image
                        src={image.url}
                        preview={{ mask: false }}
                        style={{ borderBottom: "1px solid #f0f0f0" }}
                      />
                    }
                  >
                    <Meta
                      title={image.userName}
                      description={image.imgContent}
                      style={{ whiteSpace: "pre" }}
                    />
                  </Card>
                </Col>
                {index === imageInfo.length - 1 ? (
                  ""
                ) : (
                  <Divider style={{ borderColor: "#e9d9ff" }} />
                )}
              </div>
            );
          })
        ) : (
          <Empty description="No Image" />
        )}
      </Row>
      {result && <UploadBtn />}
    </>
  );
};

export default Images;
