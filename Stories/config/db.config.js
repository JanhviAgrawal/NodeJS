const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/Story-Managment";

mongoose.connect(URI)
    .then(() => {
        console.log("MongoDB is Connected..");
    }).catch((err) => {
        console.log("MongoDB is not Connected..", err);
    });