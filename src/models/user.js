let mongoose = require("mongoose");

userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

userSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "user"
});

userSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "user"
});

User = mongoose.model("User", userSchema);

module.exports = User;
