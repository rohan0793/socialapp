let app = require("./app.js");

// Serving files
app.listen(process.env.PORT, () => {
    console.log("Serving at port 3000");
});
