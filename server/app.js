const express = require('express');
const app = express();

//========================================
//             PROCESS ENV
//========================================
const dotenv = require('dotenv');
dotenv.config();

//========================================
//              MIDDLEWARE
//========================================
const compression = require('compression');
const helmet = require('helmet');
const csp = require('helmet-csp');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

// app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, '../client/build')));

//========================================
//                  CSP
//========================================
app.use(helmet());
app.use(csp({
    useDefaults: true,
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'sha256-eE1k/Cs1U0Li9/ihPPQ7jKIGDvR8fYw65VJw+txfifw='", "apis.google.com"],
        imgSrc: ["'self'", "data:", "toy-storage.s3.ap-northeast-2.amazonaws.com"],
        frameSrc: ["'self'", "accounts.google.com"]
    }
}))
// const crypto = require('crypto');
// app.use((req, res, next) => {
//     res.locals.nonce = crypto.randomBytes(16).toString('hex');
//     next();
// });
// app.use((req, res, next) => {
//     csp({
//         useDefaults: true,
//         directives: {
//             scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`],
//         }
//     })(req, res, next);
// });

//========================================
//               DATABASE
//========================================
const db = require('./db/models');
db.sequelize.sync();

//========================================
//               PASSPORT
//========================================
const passport = require('passport');
const passportConfig = require('./middleware/passport');
app.use(passport.initialize());
passportConfig();

//========================================
//                ROUTER
//========================================
const indexRouter = require('./routes');
app.use('/api', indexRouter);

//========================================
//                CLIENT
//========================================
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//========================================
//                 ERROR
//========================================
const ApiError = require('./error/ApiError');
const apiErrorHandler = require('./error/api-error-handler');

app.use((req, res, next) => {
    next(ApiError.serverError(null, 404, '해당 페이지는 존재하지 않습니다!'));
});

app.use(apiErrorHandler);

//========================================
//                SERVER
//========================================
const port = process.env.PORT || '3000';
app.listen(port, () => {
    console.log('Server start!');
});

module.exports = app;


// const argon2 = require('argon2');
// const db = require('./db/models');

// db.users.findAll({
//     attributes: ['id', 'password']
// }).then((result) => result.map(user => {
//     const id = user.dataValues.id;
//     const password = user.dataValues.password;
//     argon2.hash(password).then(result => {
//         const hash = result.split('$')[5]
//         db.users.update({password: hash}, {
//             where: {
//                 id: id
//             }
//         });
//     }); 
// }));

// db.sequelize.sync({force: true})
//     .then(() => {
//         db.users.create({
//             firstName: '07',
//             lastName: 'user',
//             email: 'uesr07@gmail.com',
//             password: 'user0007',
//             token: '',
//             createdAt: new Date()
//         }).then(result => {
//             console.log("성공\n" + result);
//         })
//         .catch(err => {
//             console.log("실패\n" + err);
//         });
//     });