const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios"); // For async/await promises 


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password ) {
    return res.status(400).json({ message: "Both username and password are required."});
  }

   // Check if username already exists (make sure the `isValid` function checks the `users` array)
   if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists." });  // 409 Conflict instead of 404
  }

  // Add new user to the users array
  users.push({ username, password});

  // Returns success message
  return res.status(201).json({message: "User registeration successful."});
});


// Async function to simulate fetching books from an external API or database
const getBooks = async () => {
  // Simulate an async task like an API call or DB query
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);  // Resolve with the local books data
    }, 1000);  // Simulate a delay of 1 second
  });
};

// Get the book list available in the shop
// Task 10: use async/await to refactor code
public_users.get('/', async function (req, res) {
  try {
    const booksList = await getBooks(); // Wait for aysnc task to complete
    res.json(booksList); // Send the books as the response
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
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
    const isbn = req.params.isbn;

    // Check if ISBN is in the database
    const book = books[isbn];

    // If the book with the given ISBN exists
  if (book) {
    // Check if there are any reviews for the book
    if (Object.keys(book.reviews).length > 0) {
      // Send the reviews as the response
      res.json(book.reviews);
    } else {
      // If no reviews exist for the book, return a message
      return res.status(404).json({ message: "No reviews found for this book" });
    }
  } else {
    // If no book is found with the provided ISBN, return a 404 error
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
