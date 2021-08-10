const router = require('express').Router();
const userRouter = require('./users');
const boardRouter = require('./boards');

router.use('/users', userRouter);
router.use('/boards', boardRouter);

module.exports = router;