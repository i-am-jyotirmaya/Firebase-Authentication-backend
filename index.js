// import AuthMiddlewares from './src/middlewares/auth/checkIsAdmin.middleware';

const AuthMiddlewares = require('./src/middlewares/auth/checkIsAdmin.middleware');
const admin = require('firebase-admin');
const dotenvKey = require('dotenv').config();
const cors = require('cors');
// const admin = require('firebase-admin');

const profile = require('./src/controllers/profileController');
const adminRouter = require('./src/controllers/adminController');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: process.env.DB_URL
});

const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let port = process.env.PORT || 8080;

// const router = express.Router();

// router.post('/profile', (req, res) => {
//     console.log(req.body);
//     res.json({message: 'Loading'});
// });

// app.use('/api', router);
app.use('/profile', profile.profileRouter);
app.use('/admin', adminRouter.adminRouter);

app.listen(port, () => {
    console.log('Server listening at port ' + port);
});