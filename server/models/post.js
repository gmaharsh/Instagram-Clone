const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "No Photo"
    },
    postedBy: {
        type: ObjectId,
        ref:"user"
    }
})

mongoose.model("post", postSchema);