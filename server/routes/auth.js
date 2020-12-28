const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user")

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
            const user = new User({
                email: email,
                name: name,
                password: password
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
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router