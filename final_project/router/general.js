const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.json(JSON.parse(JSON.stringify(books))); // Converts the books object to a JSON string and then back to an object
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Extract the ISBN parameter from the request URL
  const isbn = req.params.isbn;

  // Find the book matching the provided ISBN
  let book = books[isbn];  // Since your `books` object is using ISBN as the key

  // If the book is found, send the book details as the response
  if (book) {
    res.json(book);
  } else {
    // If no book is found, send an error message
    return res.status(404).json({ message: "Book not found" });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  // Extract the author parameter from the request URL (similarly to ISBN)
  const author = req.params.author;
  // Find all the books where the author matches the requested author
  let booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
  // IF books are found, send them as a response
  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    // If no books are found, send a 404 error
    return res.status(404).json({ message: "No books were found by this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  // Same request as previous examples (get title from URL)
  const title = req.params.title;
  let booksByTitle = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());
  if (booksByTitle.length > 0) {
    res.json(booksByTitle);
  } else {
    return res.status(404).json({ message: "No books found by this title" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
