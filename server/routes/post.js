const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("post")

router.post("/createPost", requireLogin,  (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(422).json({
            error: "Please add all the fields"
        })
    }
    req.user.password = null
    // console.log(req.user)
    const post = new Post({
        title,
        description,   
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
module.exports = router;