let request = require("supertest");
let app = require("../src/app");
let User = require("../src/models/user");
let Post = require("../src/models/post");
let Comment = require("../src/models/comment");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// Setting up database
beforeEach(async () => {
    await User.deleteMany();

    let hashedPassword = await bcrypt.hash("admin12345", 10);
    await new User({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: hashedPassword
    }).save();
});

test("testing sign up api", async () => {
    await request(app)
        .post("/api/signup")
        .send({
            name: "Rohan",
            email: "rohan0793@gmail.com",
            password: "admin12345"
        })
        .expect(201);
});

test("testing auth api", async () => {
    await request(app)
        .post("/api/auth")
        .send({
            email: "johndoe@gmail.com",
            password: "admin12345"
        })
        .expect(200);
});

test("testing get user profile api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);
    await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});

test("testing put user profile api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);
    await request(app)
        .put("/api/users/profile")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});

test("testing del user profile api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);
    await request(app)
        .del("/api/users/profile")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(204);
});

test("testing posting a post api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);
    await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ body: "Foo bar" })
        .expect(200);
});

test("testing get posts api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);
    await request(app)
        .get("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});

test("testing get post by id api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });

    await request(app)
        .get(`/api/posts/${post._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});

test("testing put post by id api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });

    await request(app)
        .put(`/api/posts/${post._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ body: "Foo bar" })
        .expect(200);
});

test("testing delete post by id api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });

    await request(app)
        .delete(`/api/posts/${post._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(204);
});

test("testing post comment api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });
    await request(app)
        .post("/api/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ body: "Foo bar", post: post._id })
        .expect(200);
});

test("testing get comments api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);
    await request(app)
        .get("/api/comments")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});

test("testing get comment by id api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });
    let comment = await Comment.create({ body: "Foo bar", user: user._id, post: post._id });

    await request(app)
        .get(`/api/comments/${comment._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});

test("testing put post by id api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });
    let comment = await Comment.create({ body: "Foo bar", user: user._id, post: post._id });

    await request(app)
        .put(`/api/comments/${comment._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ body: "Foo bar" })
        .expect(200);
});

test("testing delete post by id api", async () => {
    let user = await User.findOne();
    let token = jwt.sign({ userId: user._id }, process.env.SECRET);

    let post = await Post.create({ body: "Foo bar", user: user._id });
    let comment = await Comment.create({ body: "Foo bar", user: user._id, post: post._id });

    await request(app)
        .delete(`/api/comments/${comment._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(204);
});
