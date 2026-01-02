const express = require("express");
const path = require("path");

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    return res.redirect("/valid");
});

app.get("/404", (req, res) => {
    const error = req.query.error;
    res.render("404", { error });
});

app.get("/valid", (req, res) => {
    return res.render("valid");
});

const middleware = (req, res, next) => {
    const user = req.query.userName;

    if (!user) return res.redirect("/404");

    const isValid = /^[A-Za-z]{2,}$/.test(user);

    if (!isValid) return res.redirect("/404?error=invalid");

    next();
};

app.get("/home", middleware, (req, res) => {
    return res.render("home", { userName: req.query.userName });
});

app.listen(PORT, (err) => {
    if (err) return console.log("Server not started...", err);
    console.log("Server Started..");
});