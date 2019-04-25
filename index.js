const express = require("express");
const compression = require("compression");
const db = require("./db");
const password = require("./password");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

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

////////////////////USERS ROUTE////////////////////
app.post("/login", (req, res) => {
    db.getUser(req.body.email).then(user => {});
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
    console.log("I'm listening.");
});
