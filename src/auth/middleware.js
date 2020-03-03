let jwt = require("jsonwebtoken");
let User = require("../models/user");

let authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            status: "error",
            message: "Token not present"
        });
    }

    token = token.replace("Bearer ", "");

    try {
        let tokenPayload = jwt.verify(token, process.env.SECRET);
        let authUser = await User.findById(tokenPayload.userId);
        req.authUser = authUser;
    } catch (err) {
        console.log(err);
        return res.status(401).send({
            status: "error",
            message: "Token invalid"
        });
    }
    next();
};

module.exports = authMiddleware;
