const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3.js");
const { s3Url } = require("./s3urlconfig.json");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc.js");
const {
    addSignInData,
    getUser,
    resetInsert,
    getResetCode,
    updatePassword,
    getUserProfile,
    updateProfilePic,
    updateBio,
    getNewUsers,
    getUserList,
    getFriendshipStatus,
    updateFriendStatus,
    InsertFriendshipStatus,
} = require("./db.js");
const { sendEmail } = require("./ses.js");

//MULTER//** Do not touch this code **//
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
//** Do not touch this code **//

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
                        console.log("email console loggen", email);
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

app.get("/user", function (req, res) {
    console.log("Mounting ID Profile");
    console.log("!!!!user route session.userId", req.session.userId);
    getUserProfile(req.session.userId).then((resp) => {
        console.log("resp from user:    ", resp);
        return res.json(resp.rows[0]);
    });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("Working");
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    let id = req.session.userId;
    console.log(id);
    if (req.file) {
        console.log("I am in the if statement");
        updateProfilePic(s3Url + req.file.filename, id)
            .then((data) => {
                // console.log("I am in dataaaaaaaaaa");
                // console.log(data);
                console.log("upload route data.rows[0]    ", data.rows[0]);
                res.json(data.rows[0]);
            })
            .catch((err) => {
                console.log("error at catching filename: ", err);
            });
    } else {
        // this runs if something goes wrong along the way :(
        res.json({
            success: false,
        });
    }
});

app.post("/bioedit", (req, res) => {
    // console.log("in server bio edit", req.body);
    let bio = req.body.bioInfo;
    // console.log(bio);
    let id = req.session.userId;
    // console.log(id);
    updateBio(bio, id).then((data) => {
        console.log("updateBio", data);
        res.json(data.rows[0]);
    });
});

//Concerning other USERSConcerning other USERSConcerning other USERSConcerning other USERSConcerning other USERSConcerning other USERSConcerning other USERS

app.get("/user/:id.json", function (req, res) {
    // console.log("Hello before getUserProfile");

    console.log("Before req.params.id as userId");
    let id = req.session.userId;
    console.log("session user id", req.session.userId);
    console.log("user id in route user:id.json", req.params.id);
    let userId = req.params.id;
    console.log("user id in route user:id.json", userId);
    if (id == userId) {
        return res.json({ userIsViewingSelf: true });
    } else {
        getUserProfile(userId)
            .then((resp) => {
                // console.log("resp from user/idjson:    ", resp);
                console.log("HELEOEOEHOE");
                console.log("userId important route", resp.rows[0]);
                return res.json(resp.rows[0]);
            })
            .catch((err) => {
                console.log("error at catching filename: ", err);
                return res.json({ invalid: true });
            });
    }
});

app.get("/users", function (req, res) {
    getNewUsers().then((data) => {
        console.log(data);
        console.log("users route getting nEwest Users", data.rows);
        return res.json(data.rows);
    });
});

app.get("/users/:query", function (req, res) {
    console.log("req.params.query", req.params.query);
    getUserList(req.params.query)
        .then((data) => {
            console.log("query data", data.rows);
            return res.json(data.rows);
        })
        .catch((err) => {
            console.log("error query business: ", err);
        });
});

app.get("/friendship/:otherId", function (req, res) {
    console.log("Hellllllllllllo");
    console.log("req.params.otherId", req.params.otherId);
    let id = req.session.userId;
    getFriendshipStatus(id, req.params.otherId)
        .then((result) => {
            console.log("Result Route from friendshipOtherId", result.rows[0]);
            if (result.rows == 0) {
                console.log("nulllll");
                return res.json({ noFriends: true });
            } else if (result.rows[0].accepted == true) {
                res.json({ friends: true });
            } else if (id == result.rows[0].sender_id) {
                console.log("yeah I am here");
                res.json({ cancelAsk: true });
            } else if (id != result.rows[0].sender_id) {
                res.json({ accept: true });
            }
        })
        .catch((err) => {
            console.log("error friendshipstatus business: ", err);
        });
});

app.post(`/handlefriends/:otherId/:button`, function (req, res) {
    console.log("handlefriends req.params", req.params);
    console.log(req.params.otherId);
    console.log(req.params.button);
    let id = req.session.userId;
    if (req.params.button == "Add as Friend") {
        console.log("adding me friendo");

        InsertFriendshipStatus(id, req.params.otherId).then((result) => {
            console.log("insertFriendship    ", result);
            return res.json(result.rows[0]);
        });
    } else if (req.params.button == "Accept Friend Request") {
        updateFriendStatus(id, req.params.otherId).then((result) => {
            console.log("Have I accepted?");
            console.log("update", result);
            res.json({ friends: true });
        });
    }
});
// Concerning other USERSConcerning other USERSConcerning other USERSConcerning other USERSConcerning other USERSConcerning other USERS
//NEVER delete or you will see nothing
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
