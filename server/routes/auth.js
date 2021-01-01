const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../keys');
const requireLogin = require('../middleware/requireLogin')

router.get('/', (req, res) => {
    res.send("Hello From Auth")
});

//Middlewares
router.get('/protected',requireLogin, (req, res) => {
    res.send("hello User")
})


router.post('/signup', (req, res) => {
    const { name, email, password, username } = req.body;
    if (!email || !password || !name || !username) {
        return res.status(422).json({
            error : " Please add all the fields"
        })    
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error : "User Already exists with that email"
                }) 
            } 
            bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    const user = new User({
                        email: email,
                        name: name,
                        username: username,
                        password: hashedPassword
                    })
                
                user.save()
                    .then((user) => {
                        res.json({
                            message:"Saved User Successfully"
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({
            message:"Please enter all the fields"
        })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                res.status(422).json({
                    error:"Invalid Email/Password"
                })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const{_id,name, email, following, followers} = savedUser
                        res.json({token, user:{_id, name, email, following, followers}})
                    } else {
                        res.status(422).json({
                            message:"Invalid Email/Password"
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
})
module.exports = router