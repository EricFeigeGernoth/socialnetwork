const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");

const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const {
    addSignInData,
    getUser,
    resetInsert,
    getResetCode,
    updatePassword,
} = require("./db.js");
const { sendEmail } = require("./ses.js");

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
            console.log("I am after email getting");
            let dbpassword = result.rows[0].password;
            console.log("dbpassword", dbpassword);
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

app.post("/resetpassword", (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    if (email == "") {
        return res.json({ error: true });
    } else {
        console.log("Before email getting");
        getUser(email)
            .then((data) => {
                if (data.rows.length < 1) {
                    res.json({ error: true });
                } else {
                    const secretCode = cryptoRandomString({
                        length: 6,
                    });
                    resetInsert(email, secretCode).then((insertResult) => {
                        console.log("insertREEEEEESUUUUUULT", insertResult);
                        const subject = "PLEASE REEEEEEEEEEEESET";
                        const body = `
                        My dearest Anonymous, you requested to reset your password and we answer immediately. 
                        Your unique reset code is: ${secretCode}.
                        Please use this code to reset your password on the website.`;
                        sendEmail(email, body, subject).then(() => {
                            console.log("I have sent the email");
                            res.json({
                                error: false,
                                verify: true,
                            });
                        });
                    });
                }
            })
            .catch((err) => {
                console.log("error", err);
                res.json({
                    error: true,
                });
            });
    }
});

app.post("/resetpassword/verify", (req, res) => {
    console.log("verify body", req.body);
    const { code, password, email } = req.body;
    if (code == "" || password == "") {
        return res.json({ error: true });
    } else {
        console.log("Before verify ");
        getResetCode(email)
            .then((data) => {
                console.log("reset verify code", data.rows[0]);
                if (code == data.rows[0].code) {
                    console.log("Code is equal");
                    hash(password).then((hashedPassword) => {
                        updatePassword(hashedPassword, email)
                            .then(() => {
                                getUser(email).then((data) => {
                                    console.log("check the data", data);
                                    console.log("Successfully updated");
                                    res.json({
                                        final: true,
                                    });
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
            })
            .catch((err) => {
                console.log("error", err);
                res.json({
                    error: true,
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
