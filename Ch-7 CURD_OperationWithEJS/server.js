const express = require("express");
const PORT = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let allUsers = [];

app.get("/", (req, res) => {
    return res.render('table', {
        allUsers
    });
});

app.get("/addUserPage", (req, res) => {
    return res.render("form");
});

app.post("/addUser", (req, res) => {
    const user = req.body;

    user.id = Math.floor(Math.random() * 1000);

    allUsers.push(user);
    return res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);

    const user = allUsers.find((user) => user.id == req.query.userId);
    if (!user) {
        return res.redirect('/not_found');
    }
    return res.render('edit', {
        user
    });
});

app.post("/updateUser", (req, res) => {
    console.log(req.body);

    allUsers = allUsers.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        } else {
            return user;
        }
    });
    return res.redirect('/');
});

app.get("/deleteUser", (req, res) => {
    console.log(req.query);
    const userId = req.query.userId;

    allUsers = allUsers.filter((user) => user.id != userId);

    console.log(allUsers);
    return res.redirect('/');
});

app.get("/not_found", (req, res) => {
    return res.render("not_found");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not Started..");
        return;
    }
    console.log("Server is Started..")
})