let express = require("express");
let app = express();
let router = require("./router");
let mongoose = require("mongoose");

// Connecting to a MongoDB database using Mongoose

let mongoHost = process.env.MONGO_HOST;
let mongoPort = process.env.MONGO_PORT;
let mongoDb = process.env.MONGO_DB;

mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDb}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Parsing only JSON from APIs since we
// are only using Node to create a REST API
app.use(express.json());

// Letting the app know about the router
app.use(router);

module.exports = app;
