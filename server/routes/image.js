require("dotenv").config();
const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const Image = require("../db/models").images;
const User = require("../db/models").users;
// const upload = require('../middleware/multer');
const upload = require("../middleware/multers3");
const images = require("../middleware/aws/s3GetListObjects");
const deleteHomeImage = require("../middleware/aws/s3DeleteObject");
const ApiError = require("../error/ApiError");
const { sequelize } = require("../db/models");

// const imagePath = path.join(__dirname, "../public/images");
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
router.get("/main", images, (req, res, next) => {
  const imageObj = req.images.map((image) => {
    const name = image.split("/")[3];
    return {
      uid: image,
      name: name,
      status: "done",
      url: s3Path + image,
    };
  });
  res.status(200).json(imageObj);
});

router.get("/images", images, async (req, res, next) => {
  // const imageObj =  req.images.map(async (image) => {
  //   const uid = image.split("/")[2];
  //   const { lastName, firstName } = await User.findOne({ where: { uid: uid } });
  //   return {
  //     uid: uid,
  //     name: lastName + firstName,
  //     status: "done",
  //     url: s3Path + image,
  //   };
  // });
  const imageObj = await Promise.all(
    req.images.map(async (image) => {
      const uid = image.split("/")[3];
      const imgName = image.split("/")[4];
      const { lastName, firstName, images } = await User.findOne({
        where: { uid: uid },
        attributes: ["lastName", "firstName"],
        include: [{ model: Image, attributes: ["imageContent"], where: { name: imgName } }],
      });
      // console.log("=============================");
      // console.log(images);
      return {
        uid: imgName,
        name: imgName,
        userName: lastName + firstName,
        userId: uid,
        status: "done",
        url: s3Path + image,
        imgContent: images[0].imageContent,
      };
    })
  );
  // console.log(imageObj);
  res.status(200).json(imageObj);
});

router.post("/mainUpload", upload.single("mainImage"), (req, res, next) => {
  // console.log(req.file)
  res.json({ S3Upload: "Success" });
});

router.post("/imgUpload", upload.single("imgFile"), async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.imageInfo);
  // console.log(req.file);
  try {
    await Image.create({
      path: req.imageInfo.uploadPath,
      name: req.imageInfo.imgName,
      url: req.file.location,
      imageContent: req.body.imgContent,
      userId: req.imageInfo.id,
    });

    res.json({ S3Upload: "Success" });
  } catch (error) {
    console.log(error);
    next(ApiError.serverError(error, 500, "/imageUpload Error!!"));
  }
});

//========================================
//       DELETE OBJECT TO AWS S3
//========================================
router.delete("/remove/:imgPath", deleteHomeImage, async (req, res, next) => {
  try {
    await Image.destroy({
      where: {
        name: req.body.name,
      },
    });
    res.status(200).json({ imgDel: true });
  } catch (error) {
    console.log(error);
    next(ApiError.serverError(error, 500, "/imageDelete Error!!"));
  }
});

// router.delete('/main/:fileName', (req, res, next) => {
//     fs.unlinkSync(imagePath +'/'+ req.params.fileName);
//     res.status(200).json({imgDel: true});
// });

module.exports = router;
