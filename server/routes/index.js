const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const boardRouter = require('./boards');
const imageRouter = require('./image');

router.use('/users', userRouter);
router.use('/boards', boardRouter);
router.use('/image', imageRouter);

module.exports = router;