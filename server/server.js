const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");

//SHOULD BE INSTALLED IN EVERY SERVER
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    // }
});

//NEVER delete or you will see nothing
app.get("*", function (req, res) {
    // if (!req.session.userId) {
    //     res.redirect("/welcome");
    // } else {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    // }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
