let mongoose = require("mongoose");

likeSchema = mongoose.Schema({
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

Like = mongoose.model("Like", likeSchema);

module.exports = Like;
