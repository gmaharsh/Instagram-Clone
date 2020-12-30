const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("post")

router.post("/createPost", requireLogin,  (req, res) => {
    const { caption, image } = req.body;
    console.log("image:-", image)
    console.log(caption)
    if (!caption || !image) {
        return res.status(422).json({
            error: "Please add all the fields"
        })
    }
    req.user.password = null
    // console.log(req.user)
    const post = new Post({
        caption,
        image: image,   
        postedBy:req.user
    })

    post.save()
        .then((result) => {
            res.json({
                message:"Post Saved"
            })
        })
        .catch((error) => {
            res.json({
                error:error
            })
        })
})

router.get("/allPost", (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then((posts) => {
            res.json({
                post: posts
            })
        })
        .catch((error) => {
            res.json({
                error:error
            })
        })
})

router.get("/myPost",requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then((myPost) => {
            res.json({
                post : myPost
            })
        }).catch((error) => {
            res.json({
                error: error
            })
        })
})

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push : {likes:req.user._id}
    }, {
        new : true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull : {likes:req.user._id}
    }, {
        new : true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
})
module.exports = router;