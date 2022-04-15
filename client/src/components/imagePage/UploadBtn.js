import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchImages } from "../../_reducer/imageReducer";
import axios from "axios";
import { Button, Modal, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const btnStyle = {
  bottom: "25px",
  right: "30px",
  position: "fixed",
  width: "50px",
  height: "50px",
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const UploadBtn = () => {
  const dispatch = useDispatch();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [file, setFile] = useState([]);
  const [imgContent, setImgContent] = useState("");

  const showUpload = () => {
    setUploadVisible(!uploadVisible);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("imgFile", file[0]);
    formData.append("imgContent", imgContent);
    await axios.post("/api/image/upload/images", formData);

    setUploadVisible(false);
    setFile([]);
    setImgContent("");

    await dispatch(fetchImages());
  };

  const handleCancel = () => {
    setUploadVisible(false);
  };

  const handlerImgContent = (e) => {
    setImgContent(e.target.value);
  };

  const handlerFileRemove = () => {
    setFile([]);
  };

  const handlerBeforeUpload = async (file, fileList) => {
    if (!file.url && !file.preview) {
      file.url = await getBase64(file);
    }
    setFile([file]);
    return false;
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        size="large"
        style={btnStyle}
        onClick={showUpload}
        icon={<UploadOutlined />}
      ></Button>
      <Modal
        visible={uploadVisible}
        closable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form style={{ padding: "10px" }}>
          <Form.Item label="Write">
            <Input.TextArea
              value={imgContent}
              placeholder="Typing"
              onChange={handlerImgContent}
            ></Input.TextArea>
          </Form.Item>
          <Form.Item name="upload" label="Upload">
            <Upload
              name="uploadImage"
              listType="picture"
              fileList={file}
              onRemove={handlerFileRemove}
              beforeUpload={handlerBeforeUpload}
              maxCount={1}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Select Image
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
