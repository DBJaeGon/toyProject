import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImageDel, removeFile, previewFile, fetchImages } from "../../_reducer/imageReducer";
import { Upload, Modal } from "antd";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const MyImages = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user.authState);
  const imageInfo = useSelector((state) => state.image.images.imageInfo);
  const { previewVisible, previewTitle, previewImage } = useSelector((state) => state.image.images);

  const handleCancel = () => {
    dispatch(previewFile({ previewVisible: false }));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    const previewObj = {
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    };
    dispatch(previewFile(previewObj));
  };

  const handleRemove = async (file) => {
    // if (file.name.includes("homeImage1") || file.name.includes("homeImage2")) {
    //   return message.error("지울 수 없는 이미지입니다!");
    // }
    const imgInfo = { path: file.userId, fileName: file.name };
    // console.log(imgInfo);
    await dispatch(fetchImageDel(imgInfo));
    await dispatch(removeFile(file.name));
  };

  // const handleSuccess = async (res) => {
  //   await dispatch(fetchImages());
  // };

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  // useEffect(() => {
  //     if(fileObj) {
  //         dispatch(addFile(fileObj));
  //     }
  // }, [dispatch, fileObj]);

  // const handleBeforeUpload = async(file) => {
  //     const fileInfo = {
  //         uid: file.uid,
  //         name: file.name,
  //         status: "done",
  //         url: `http://localhost:5000/images/${file.name}`
  //     };
  //     setFileObj(fileInfo);
  // };

  return (
    <>
      <Upload
        name="myImages"
        listType="picture-card"
        fileList={imageInfo.filter((image) => image.userId === userInfo.uid)}
        onPreview={handlePreview}
        // onSuccess={handleSuccess}
        onRemove={handleRemove}
        // beforeUpload={handleBeforeUpload}
      ></Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MyImages;
