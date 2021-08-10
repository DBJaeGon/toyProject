const router = require('express').Router();
const passport = require('passport');
const ApiError = require('../error/ApiError');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
    console.log('cool');
    // res.json(req.auth);
    res.send('boards')
});

router.get('/first', (req, res) => {
    console.log('cool');
    // res.json(req.auth);
    res.send('first')
});


module.exports = router;