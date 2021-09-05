require('dotenv').config();
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
// const upload = require('../middleware/multer');
const upload = require('../middleware/multers3');
const mainImage = require('../middleware/aws/s3GetListObjects');
const deleteHomeImage = require('../middleware/aws/s3DeleteObject');
const ApiError = require('../error/ApiError');

const imagePath = path.join(__dirname, '../public/images');
const s3Path = process.env.AWS_S3_OBJECT_PATH;

//========================================
//            MULTER, PUBLIC
//========================================
// router.get('/main', (req, res, next) => {
//     const files = fs.readdirSync(imagePath);
//     const fileList = files.map(file => {
//         return {
//             uid: file + Date.now(),
//             name: file,
//             status: 'done',
//             url: `http://localhost:5000/images/${file}`
//         };
//     });
//     res.json(fileList);
// });

//========================================
//         GET OBJECT FROM AWS S3
//========================================
router.get('/main', mainImage, (req, res, next) => {
    const imageObj = req.mainImages.map(image => {
        const name = image.split('/')[2];
        return {
            uid: image,
            name: name,
            status: 'done',
            url: s3Path + image
        };
    });
    res.status(200).json(imageObj);
});

router.post('/mainUpload', upload.single('mainImage'), (req, res, next) => {
    // console.log(req.file)
    res.json({S3Upload: "Success"});
});

//========================================
//       DELETE OBJECT TO AWS S3
//========================================
router.delete('/main/:fileName', deleteHomeImage, (req, res, next) => {
    res.status(200).json({imgDel: true});
});


// router.delete('/main/:fileName', (req, res, next) => {
//     fs.unlinkSync(imagePath +'/'+ req.params.fileName);
//     res.status(200).json({imgDel: true});
// });

module.exports = router;