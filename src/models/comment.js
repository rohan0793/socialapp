let mongoose = require("mongoose");

commentSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post"
    }
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
