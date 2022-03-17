const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const boardRouter = require("./boards");
const imageRouter = require("./image");
const chatRouter = require("./chat");

router.use("/users", userRouter);
router.use("/boards", boardRouter);
router.use("/image", imageRouter);
router.use("/chat", chatRouter);

module.exports = router;
