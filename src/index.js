'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser')


//init dbs 
require('./databases/init.mongodb')

//user middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('combined'))
var whitelist = ['http://localhost:3000', 'https://peerpress.vn/']
var corsOptions = {
//   origin: ['http://localhost:3000', 'https://peerpress.vn/'],
  credentials: true,
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH']
}
app.use('/v1',cors())

app.use('/public', cors())
app.use('/public', express.static(path.join(__dirname, 'public')))

// compress responses
app.use(compression({
    level: 6,
    threshold: 100*1024
}))
app.use(cookieParser());

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//router
app.use(require('./routes/index.router'))

// Error Handling Middleware called

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});


// error handler middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});



const {PORT} = process.env;

app.listen( PORT, () => {
    console.log(`Server start with port ${PORT}`);
})