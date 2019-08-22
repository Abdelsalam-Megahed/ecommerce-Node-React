const User = require('../models/user');
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    //find user based on email
    const {email, password} = req.body;
    User.findOne({email}, (error, user) => {
        if(error || !user){
            res.status(400).json({
                error: "User with that email doesn't exist. Please signin"
            });
        }
        //if user is found make sure the email and pass match
        if(!user.authenticate(password)){
           return res.status(401).json({
               error: "Email and password don't match"
           })
        }
        //generate token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend
        const {_id, name, email, role} = user;
        return res.json({token, user: {
            _id, name, email, role
        }})
    })

}