const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    book_name: {
        type: String,
        require: true
    },
    book_author: {
        type: String,
        require: true
    },
    book_price: {
        type: Number,
        require: true
    },
    book_lang: {
        type: String,
        require: true
    },
    book_image: {
        type: String,
        require: true
    }
});

const Book = mongoose.model("Book", bookSchema, "Books");

module.exports = Book;