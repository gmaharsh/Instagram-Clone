const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref:"user"
    }],
    comments: [{
        type: String,
        postedBy: {
            type: ObjectId,
            ref:"user"
        }
    }],
    postedBy: {
        type: ObjectId,
        ref:"user"
    }
}, {timestamps:true})

mongoose.model("post", postSchema);