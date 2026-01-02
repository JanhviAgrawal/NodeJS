const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/Employee-Management";

mongoose.connect(URI)
    .then(() => {
        console.log("MongoDb is Connected...");
    }).catch((err) => {
        console.log("MongoDb is Not Connected...", err);
    });