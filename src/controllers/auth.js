let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let User = require("../models/user");

let signUp = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    try {
        let user = await User.create(req.body);
        res.status(201).send({
            status: "success",
            data: {
                user: user
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send({
                status: "error",
                message: "Email taken"
            });
        } else {
            res.status(400).send({
                status: "error",
                message: "Could not sign up"
            });
        }
    }
};

let auth = async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) {
        return res.status(400).send({
            status: "error",
            message: "User not found"
        });
    }

    let authenticated = await bcrypt.compare(req.body.password, user.password);

    if (!authenticated) {
        return res.status(401).send({
            status: "error",
            message: "Unauthorized"
        });
    }

    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    return res.status(200).send({
        status: "success",
        data: {
            token: token
        }
    });
};

module.exports = {
    signUp: signUp,
    auth: auth
};
