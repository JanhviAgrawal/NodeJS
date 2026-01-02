const express = require('express');
const db = require("./config/db.config");

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return;
    }
    console.log("Server is started...");
});