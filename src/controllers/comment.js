let Comment = require("../models/comment");

let post = async (req, res) => {
    let authUserId = req.authUser._id;
    let comment = await Comment.create({
        ...req.body,
        user: authUserId
    });

    return res.status(200).send({
        status: "success",
        data: {
            comment
        }
    });
};

let get = async (req, res) => {
    let comments = await Comment.find();

    return res.status(200).send({
        status: "success",
        data: {
            comments
        }
    });
};

let find = async (req, res) => {
    let comment = await Comment.findOne({ _id: req.params.id });

    return res.status(200).send({
        status: "success",
        data: {
            comment
        }
    });
};

let put = async (req, res) => {
    let authUserId = req.authUser._id;

    let comment = await Comment.findOneAndUpdate(
        { _id: req.params.id, user: authUserId },
        { $set: req.body },
        { new: true }
    );

    return res.status(200).send({
        status: "success",
        data: {
            comment
        }
    });
};

let del = async (req, res) => {
    let authUserId = req.authUser._id;

    await Comment.findOneAndRemove({ _id: req.params.id, user: authUserId });

    return res.status(204).send();
};

module.exports = {
    post,
    get,
    find,
    put,
    del
};
