const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const boardRouter = require('./boards');

router.use('/users', userRouter);
router.use('/boards', boardRouter);

module.exports = router;