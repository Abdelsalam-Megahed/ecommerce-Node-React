const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./routes/user');

//app
require("dotenv").config();

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Database connected.");
    
})
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
//routes middleware
app.use('/api',userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is up and running");
    
})