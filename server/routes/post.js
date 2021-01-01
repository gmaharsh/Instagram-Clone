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

    console.log(post)

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
    }).populate("postedBy", "_id name")
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
})


router.put('/dislike', requireLogin, (req, res) => {
    // console.log("I am clicked")
    Post.findByIdAndUpdate(req.body.postId, {
        $pull : {likes:req.user._id}
    }, {
        new : true
    }).populate("postedBy", "_id name")
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res) => {
    // console.log("Comment:-",req.body.comment)
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    // console.log(req.body.text)
    console.log("Text:-",comment)
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new : true
    }).populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name" )
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({
                error_from_server: err
            })
        } else {
            res.json(result)
        }
    })
})

router.delete('/delete/:postId', requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({
                    error: err
                })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()){
                post.remove()
                    .then(result => {
                        res.json({
                            message: "Successfully deleted",
                            result
                        })
                        // console.log("Deletion result:-", result)

                })
            }
        })
})

module.exports = router;