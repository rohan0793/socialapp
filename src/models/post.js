let mongoose = require("mongoose");

postSchema = mongoose.Schema(
    {
        body: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

postSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post"
});

postSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "post"
});

let Post = mongoose.model("Post", postSchema);

module.exports = Post;
