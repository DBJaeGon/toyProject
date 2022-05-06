import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, message } from "antd";
import QuillEditor from "./QuillEditor";

const CreateBoard = () => {
  // const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const history = useHistory();

  const onEditorChange = (value) => {
    setContent(value);
  };

  const onFilesChange = (file) => {
    const newArr = [...files, file];
    setFiles(newArr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setContent("");

    const variables = {
      content,
    };

    axios.post("/api/boards/createPost", variables).then((response) => {
      if (response) {
        message.success("Post Created!");

        setTimeout(() => {
          history.push("/boards");
        }, 2000);
      }
    });
  };

  return (
    <div style={{ maxWidth: "120vh", margin: "2rem auto" }}>
      <QuillEditor onEditorChange={onEditorChange} onFilesChange={onFilesChange} />
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Button type="primary" size="large" htmlType="submit" onSubmit={handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default CreateBoard;
