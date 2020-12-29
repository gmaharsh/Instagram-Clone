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
    postedBy: {
        type: ObjectId,
        ref:"user"
    }
})

mongoose.model("post", postSchema);