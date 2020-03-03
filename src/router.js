let express = require("express");
let router = express.Router();
let AuthController = require("./controllers/auth");
let ProfileController = require("./controllers/profile");
let PostController = require("./controllers/post");
let CommentController = require("./controllers/comment");
let authMiddleware = require("./auth/middleware");

// Sign up and authenticate
router.post("/api/signup", AuthController.signUp);
router.post("/api/auth", AuthController.auth);

// User routes
router.get("/api/users/profile", authMiddleware, ProfileController.get);
router.put("/api/users/profile", authMiddleware, ProfileController.put);
router.delete("/api/users/profile", authMiddleware, ProfileController.del);

// Post routes
router.post("/api/posts", authMiddleware, PostController.post);
router.get("/api/posts", authMiddleware, PostController.get);
router.get("/api/posts/:id", authMiddleware, PostController.find);
router.put("/api/posts/:id", authMiddleware, PostController.put);
router.delete("/api/posts/:id", authMiddleware, PostController.del);

// Toggle Like
router.post("/api/posts/:id/like", authMiddleware, PostController.like);

// Comment routes
router.post("/api/comments", authMiddleware, CommentController.post);
router.get("/api/comments", authMiddleware, CommentController.get);
router.get("/api/comments/:id", authMiddleware, CommentController.find);
router.put("/api/comments/:id", authMiddleware, CommentController.put);
router.delete("/api/comments/:id", authMiddleware, CommentController.del);

if (process.env.ENV === "dev") {
    router.get("/api/playground", async (req, res) => {
        return res.send("End of request");
    });
}

module.exports = router;
