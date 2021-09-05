import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMainImage, fetchMainImageDel, removeFile, previewFile } from '../../_reducer/imageReducer'
import { Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

const MainImage = () => {

    const dispatch = useDispatch();

    const imageInfo = useSelector(state => state.image.main.imageInfo);
    const { previewVisible, previewTitle, previewImage } = useSelector(state => state.image.main);

    const handleCancel = () => {
        dispatch(previewFile({previewVisible: false}));
    };

    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      
      const previewObj = {
        previewImage: file.url || file.preview,
        previewVisible: true,
        previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      }
      dispatch(previewFile(previewObj));
    };
  
    // const handleChange = async(info) => {
    //     const { status } = info.file;
    //     if (status === 'uploading') {
    //         message.success(`${info.file.name} file uploaded successfully.`);
    //     }  else if (status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }        
    // };

    const handleRemove = async(file) => {
        await dispatch(fetchMainImageDel(file.name));
        await dispatch(removeFile(file.uid));
    };

    const handleSuccess = async(res) => {
        console.log(res)
        await dispatch(fetchMainImage());
    };

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

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload 
                name="mainImage"
                action="api/image/mainUpload"
                listType="picture-card"
                fileList={imageInfo}
                onPreview={handlePreview}
                onSuccess={handleSuccess}
                // onChange={handleChange}
                onRemove={handleRemove}
                // beforeUpload={handleBeforeUpload}
            >
                {imageInfo.langth >= 8 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default MainImage;


// const uploadProps = {
        
//     beforeUpload(file) {
//         return new Promise(resolve => {
//           const reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = () => {
//             const img = document.createElement('img');
//             img.src = reader.result;
//             img.onload = () => {
//               const canvas = document.createElement('canvas');
//               canvas.width = img.naturalWidth;
//               canvas.height = img.naturalHeight;
//               const ctx = canvas.getContext('2d');
//               ctx.drawImage(img, 0, 0);
//               ctx.fillStyle = 'red';
//               ctx.textBaseline = 'middle';
//               ctx.font = '33px Arial';
//               ctx.fillText('Ant Design', 20, 20);
//               canvas.toBlob(resolve);
//             };
//           };
//         });
//       },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//           console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
//           message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//           message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// }