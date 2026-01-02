// console.log("Hello Todo-list");
const express = require("express");
const PORT = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

let allLists = [];

app.get("/", (req, res) => {
    return res.render('home', {
        allLists
    });
});

app.get("/addTaskPage", (req, res) => {
    return res.render("form");
});

app.post("/addTask", (req, res) => {
    const list = req.body;

    list.id = Math.floor(Math.random() * 1000);

    allLists.push(list);
    return res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);

    const list = allLists.find((list) => list.id == req.query.listID);
    if (!list) {
        return res.redirect('/not_found');
    }
    return res.render('edit', {
        list
    });
});

app.post("/updateList", (req, res) => {
    console.log(req.body);

    allLists = allLists.map((list) => {
        if (list.id == req.body.id) {
            return req.body;
        } else {
            return list;
        }
    });
    return res.redirect('/');
});

app.get("/deleteList", (req, res) => {
    console.log(req.query);
    const listID = req.query.listID;

    allLists = allLists.filter((list) => list.id != listID);

    console.log(allLists);
    return res.redirect('/');
});

app.get("/not_found", (req, res) => {
    return req.render('not_found');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not Started..");
        return;
    }
    console.log("Server is Started..")
});