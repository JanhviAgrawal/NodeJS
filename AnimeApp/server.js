const express = require("express");
const path = require("path");
const db = require("./config/db.config");
const Anime = require("./model/anime.model");

const PORT = 8000;
const app = express();

// Setting view Engine
app.set('view engine', 'ejs');

// MiddleWare
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

//Route
app.get('/', async (req, res) => {
    const allAnimes = await Anime.find();
    return res.render('home', { allAnimes });
});

app.get('/addAnime', (req, res) => {
    return res.render('form');
});

//Insert Anime
app.post('/addAnime', async (req, res) => {
    console.log(req.anime);

    const animeAdded = await Anime.create(req.body);
    console.log(animeAdded);

    if (animeAdded) {
        console.log("Anime Added Successfully");
        return res.redirect('/');
    } else {
        console.log("Anime Not Added");
    }
});
// Edit Route
app.get('/editAnime/:animeId', async (req, res) => {
    console.log(req.params);

    const anime = await Anime.findById(req.params.animeId);

    console.log(anime);

    if (anime) {
        return res.render('edit', { anime });
    } else {
        return res.redirect('/');
    }
});


// Update Anime Logic
app.post('/updateAnime', async (req, res) => {
    console.log(req.body);

    const updatedData = await Anime.findByIdAndUpdate(req.body.id, req.body, { new: true });

    console.log("Update : ", updatedData);

    return res.redirect('/');
});

// Delete Anime Logic
app.get('/deleteAnime', async (req, res) => {
    console.log(req.query);

    const deletedAnime = await Anime.findByIdAndDelete(req.query.animeId);
    if (deletedAnime) {
        console.log("Anime deleted successfully...");
    } else {
        console.log("Anime deletion failed...");
    }
    return res.redirect('/');
});


// PORT
app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started..😖", err);
        return;
    }
    console.log("Server Started..🥰");
});