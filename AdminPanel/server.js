const express = require('express');
const path = require('path');
require('./config/db.config');
const cookieparser = require('cookie-parser');

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieparser());

app.use('/', require('./routes/index'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not Started", err);
        return;
    }
    console.log("Server is Started on PORT ", PORT);
});