const express = require("express");
const db = require("./config/db.config");
const Book = require("./model/book.model");

const PORT = 7000;
const app = express();

// Setting view Engine
app.set('view engine', 'ejs');

// MiddleWare
app.use(express.urlencoded());

//Routes
app.get('/', async (req, res) => {
    const allBooks = await Book.find();
    return res.render('table', { allBooks });
});

app.get('/addBookPage', (req, res) => {
    return res.render('form');
});

//Insert Book
app.post('/addBook', async (req, res) => {
    console.log(req.book);

    // const bookData = req.body

    // Book.create(req.body).then(() => {
    //     console.log("Book insrted Successfully...");
    // }).catch(err => {
    //     console.log("Book insertion failed");
    //     console.log("Error", err);
    // });

    const bookAdded = await Book.create(req.body);
    console.log(bookAdded);

    if (bookAdded) {
        console.log("Book Added Successfully");
        return res.redirect('/');
    } else {
        console.log("Book Not Added");
    }
});

// Edit Route
app.get('/editBook/:bookId', async (req, res) => {
    console.log(req.params);

    const book = await Book.findById(req.params.bookId);

    console.log(book);

    if (book) {
        return res.render('edit', { book });
    } else {
        return res.redirect('/');
    }
});

// Update Book Logic
app.post('/updateBook', async (req, res) => {
    console.log(req.body);

    const updatedData = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

    console.log("Update : ", updatedData);

    return res.redirect('/');
});

// Delete Book Logic
app.get('/deleteBook', async (req, res) => {
    console.log(req.query);

    const deletedBook = await Book.findByIdAndDelete(req.query.bookId);
    if (deletedBook) {
        console.log("Book deleted successfully...");
    } else {
        console.log("Book deletion failed...");
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