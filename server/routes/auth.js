const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user")
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./../config/keys');
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
// 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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:"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",
    }
}))



router.get('/', (req, res) => {
    res.send("Hello From Auth")
});

//Middlewares
router.get('/protected',requireLogin, (req, res) => {
    res.send("hello User")
})


router.post('/signup', (req, res) => {
    const { name, email, password, username, image } = req.body;
    console.log(image)
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
                        password: hashedPassword,
                        profileImage: image
                    })
                
                user.save()
                    .then((user) => {
                        transporter.sendMail({
                            to: user.email,
                            from: "gmaharsh2@gmail.com",
                            subject: 'Welcome to my clone',
                            text: 'Hope you have get onboarding and nice experience',
                            html: '<b>Welcome to Instagram</b> <p>Hope you have get onboarding and nice experience</p>'
                        })
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

router.post('/reset-password', (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({
                        error:"User don't exists with this email"
                    })
                }
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;
                user.save().then((res) => {
                    transporter.sendMail({
                        to: user.email,
                        from: "gmaharsh2@gmail.com",
                        subject: 'Reset Your Password',
                        html: `<b>Reset Your Password</b>
                         <p>You have requested to reset your password</p> 
                         <p>Kindly click the <a href="http://localhost:3000/reset/${token}">link</a> to reset your password, The link would expire in 1 hour.</p>`
                    })
                    res.json({
                        message: "Check your email"
                    })
                })
            })
    })
})

router.post('/newpassword', (req, res) => {
    const newPassword = req.body.password;
    const sentToken = req.body.token;
    User.findOne({
        resetToken: sentToken, 
        expireToken:{$gt:Date.now()}
    }).then(user => { 
        if (!user) {
            res.status(422).json({
                error:"Session Expired, Request a new Password Link and Change in One hour"
            })
        }
        bcrypt.hash(newPassword, 12).then(hashedPassword => {
            user.password = hashedPassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then((savedUser) => {
                res.json({
                    message:"Password Updated"
                })
            })
        })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) => {
    console.log("i am called")
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
                        // console.log(email)
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, following, followers, profileImage } = savedUser
                        console.log(savedUser)
                        res.json({token, user:{_id, name, email, following, followers, profileImage}})
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