const express = require("express");
const compression = require("compression");
const db = require("./db");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const password = require("./password");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const app = express();

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 24,
        secret: `Isay:Hey!Whatisgoingon?`
    })
);

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

////////////////////CSURF////////////////////

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("./public"));
//app.use(require("body-parser").json());
app.use(express.json());

////////////////////WELCOME ROUTE////////////////////

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

////////////////////REGISTER ROUTE////////////////////

app.post("/register", (req, res) => {
    password
        .hashPassword(req.body.password)
        .then(hashedPassword => {
            return db.registerUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPassword,
                new Date()
            );
        })
        .then(userId => {
            req.session.userId = userId;
            res.redirect("/");
        })
        .catch(() => {
            res.sendStatus(500);
        });
});
////////////////////LOGIN ROUTE////////////////////

app.post("/login", (req, res) => {
    db.getUser(req.body.email).then(user => {
        if (user == null) {
            return res.status(400).json({ error: "user not found" });
        }

        password
            .checkPassword(req.body.password, user.password)
            .then(doesMatch => {
                if (doesMatch == true) {
                    req.session.userId = user.id;

                    res.redirect("/");
                } else {
                    res.status(400).json({ error: "wrong password" });
                }
            });
    });
});

////////////////////LOGOUT ROUTE////////////////////

app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
});

function loggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.sendStatus(401);
    }
}

////////////////////USERS ROUTE////////////////////

app.get("/users", loggedIn, (req, res) => {
    db.getUserData(req.session.userId).then(usersImage => {
        res.json(usersImage);
    });
});

////////////////////UPLOAD PICTURE ROUTE////////////////////

app.post(
    "/uploadProfilePicture",
    loggedIn,
    uploader.single("picture"),
    (req, res) => {
        s3.uploadImage(req.file.path, req.file.filename)
            .then(url => {
                return db
                    .updateProfilePicture(url, req.session.userId)
                    .then(() => {
                        res.json({
                            url: url
                        });
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({
                    message: "Upload failed."
                });
            });
    }
);

////////////////////BIO ROUTE////////////////////

app.put("/editbio", loggedIn, (req, res) => {
    db.updateBio(req.body.bio, req.session.userId).then(() => {
        res.sendStatus(200);
    });
});

////////////////////EVERYTHING ROUTE////////////////////

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("Oi, genau!");
});
