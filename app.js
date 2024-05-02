require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const db = require('./models');
const app = express();
const router = require('./routes/index');
//disable cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




app.use('/', router);

db.sequelize.sync().then(() => {
    console.log('Database connected');
    }).catch((err) => {
    console.log('Error connecting to database', err);
    }
);


module.exports = app;







// START command: npm run start / node bin/www