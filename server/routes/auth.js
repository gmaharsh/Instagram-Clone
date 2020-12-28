const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user")
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send("Hello From Auth")
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
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
                        res.json({
                            message : "Successfully SignIn"
                        })
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