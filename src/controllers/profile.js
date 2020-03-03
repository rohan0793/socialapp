let User = require("../models/user");

let get = async (req, res) => {
    let authUser = req.authUser;

    return res.status(200).send({
        status: "success",
        data: {
            user: authUser
        }
    });
};

let put = async (req, res) => {
    let user = await User.findByIdAndUpdate(req.authUser._id, req.body, {
        new: true
    });

    return res.status(200).send({
        status: "success",
        data: {
            user: user
        }
    });
};

let del = async (req, res) => {
    await User.findOneAndDelete({ _id: req.authUser._id });
    return res.status(204).send();
};

module.exports = {
    get,
    put,
    del
};
