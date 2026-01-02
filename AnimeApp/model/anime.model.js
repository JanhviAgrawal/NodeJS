const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
    anime_name: {
        type: String,
        required: true
    },
    anime_production: {
        type: String,
        required: true
    },
    anime_auth: {
        type: String,
        required: true
    },
    anime_lang: {
        type: String,
        required: true
    },
    anime_genres: {
        type: String,
        required: true
    },
    anime_ep_num: {
        type: Number,
        required: true
    },
    anime_season: {
        type: Number,
        required: true
    },
    anime_img: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Anime = mongoose.model("Anime", animeSchema, "Animes");

module.exports = Anime;