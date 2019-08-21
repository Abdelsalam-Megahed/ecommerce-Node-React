const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

//routes middleware
app.use('/api',userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is up and running");
    
})