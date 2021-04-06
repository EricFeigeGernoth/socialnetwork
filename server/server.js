const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const { addSignInData, getUser } = require("./db.js");

//MiddlewareMiddlewareMiddlewareMiddlewareMiddlewareMiddlewareMiddlewareMiddlewareMiddlewareMiddleware

//SHOULD BE INSTALLED IN EVERY SERVER
app.use(compression());
app.use(express.urlencoded({ extendend: false }));
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(
    cookieSession({
        secret: `carolingian Renaissance`,
        maxAge: `1000 * 60 * 60 * 24 * 14`,
    })
);
app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//MiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareENDMiddlewareEND
app.get("/welcome", (req, res) => {
    // if (req.session.userId) {
    //     res.redirect("/");
    // } else {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    // }
});

app.post("/register", (req, res) => {
    console.log(req.body);
    const { first, last, email, password } = req.body;
    if (first == "" || last == "" || email == "" || password == "") {
        return res.json({ error: true });
    } else {
        // let hashedPassword = hash(password);
        // console.log(password);
        hash(password).then((hashedPassword) => {
            // console.log("password: ", password);
            // console.log("hashedPassword: ", hashedPassword);
            // console.log("first", first);
            // console.log("last", last);
            // console.log("email", email);
            // console.log("before user data");
            addSignInData(first, last, email, hashedPassword)
                .then((usersData) => {
                    console.log("after user data");
                    // console.log(usersData);
                    req.session.userId = usersData.rows[0].id;
                    console.log("req.session.userId:   ", req.session.userId);
                    res.json({
                        success: true,
                    });
                })
                .catch((err) => {
                    console.log("error", err);
                    res.json({
                        error: true,
                    });
                });
        });
    }
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (email == "" || password == "") {
        return res.json({ error: true });
    } else {
        getUser(email).then((result) => {
            let dbpassword = result.rows[0].password;
            compare(password, dbpassword).then((match) => {
                if (match === true) {
                    console.log("in match");
                    req.session.userId = result.rows[0].id;
                    res.json({
                        success: true,
                    });
                } else {
                    res.json({
                        error: true,
                        message: "Wrong Password",
                    });
                }
            });
        });
    }
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
