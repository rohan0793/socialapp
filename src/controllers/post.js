let Post = require("../models/post");
let Like = require("../models/like");

let post = async (req, res) => {
    let authUserId = req.authUser._id;

    let post = await Post.create({
        ...req.body,
        user: authUserId
    });

    return res.status(200).send({
        status: "success",
        data: {
            post
        }
    });
};

let get = async (req, res) => {
    let posts = await Post.find()
        .populate("comments")
        .populate("likes")
        .exec();

    return res.status(200).send({
        status: "success",
        data: {
            posts
        }
    });
};

let find = async (req, res) => {
    let post = await Post.findOne({ _id: req.params.id })
        .populate("comments")
        .populate("likes")
        .exec();

    return res.status(200).send({
        status: "success",
        data: {
            post
        }
    });
};

let put = async (req, res) => {
    let authUserId = req.authUser._id;

    let post = await Post.findOneAndUpdate(
        { _id: req.params.id, user: authUserId },
        { $set: req.body },
        { new: true }
    );

    return res.status(200).send({
        status: "success",
        data: {
            post
        }
    });
};

let del = async (req, res) => {
    let authUserId = req.authUser._id;

    await Post.findOneAndRemove({ _id: req.params.id, user: authUserId });

    return res.status(204).send();
};

let like = async (req, res) => {
    let postId = req.params.id;
    let authUserId = req.authUser._id;

    let like = await Like.findOne({ user: authUserId, post: postId });

    if (like) {
        like.remove();
    } else {
        like = await Like.create({ user: authUserId, post: postId });
    }

    return res.status(200).send({
        status: "success",
        data: {
            like
        }
    });
};

module.exports = {
    post,
    get,
    find,
    put,
    del,
    like
};
