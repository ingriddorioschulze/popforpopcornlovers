const express = require("express");
const compression = require("compression");
const db = require("./db");
const password = require("./password");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const app = express();

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

// app.use(csurf());

// app.use(function(req, res, next) {
//     res.set("x-frame-option", "DENY");
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use(express.static("./public"));

////////////////////WELCOME ROUTE////////////////////
app.get("/welcome", (req, res) => {});

////////////////////REGISTER ROUTE////////////////////
app.post("/register", (req, res) => {
    password
        .hashPassword(req.body.password)
        .then(hashedPassword => {
            return db.saveUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPassword,
                new Date()
            );
        })
        .then(userId => {
            req.session.user = {
                // id: userId,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email
            };
            res.redirect("/profile");
        })
        .catch(() => {
            res.redirect("/register?erroremail=email");
        });
});
////////////////////LOGIN ROUTE////////////////////
app.get("/login", (req, res) => {
    if (req.session.user !== undefined) {
        res.redirect("/petition");
    } else {
        res.render("login", {
            erroruser: req.query.erroruser,
            errorpass: req.query.errorpass
        });
    }
});

app.post("/login", (req, res) => {
    db.getUser(req.body.email).then(user => {
        if (user == null) {
            return res.redirect("/login?erroruser=usernotfound");
        }

        password
            .checkPassword(req.body.password, user.password)
            .then(doesMatch => {
                if (doesMatch == true) {
                    req.session.user = {
                        id: user.user_id,
                        firstname: user.first_name,
                        lastname: user.last_name
                        //missing infos//
                    };
                    if (user.profile_id == null) {
                        res.redirect("/profile");
                    } else if (user.signature_id == null) {
                        res.redirect("/petition");
                    } else {
                        res.redirect("/petition/signed");
                    }
                } else {
                    res.redirect("/login?errorpass=wrongpassword");
                }
            });
    });
});

////////////////////LOGOUT ROUTE////////////////////
app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
});

////////////////////EVERYTHING ROUTE////////////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
