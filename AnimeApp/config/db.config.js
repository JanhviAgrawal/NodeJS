const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/Anime-Management";

mongoose.connect(URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB not Connected : ", err));
