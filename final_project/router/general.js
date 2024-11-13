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
// Task 11: refactor endpoint to be asynchronous using async/await

const getBooksByIsbn = async (isbn) => {
  return new Promise ((resolve, reject) => {
    const book = books[isbn]; // Search for book by ISBN from the books object
    if (book) {
      resolve(book); // If the book is found, resolve the promise w/ the book
    } else {
      reject("Book not found"); // If no book is found, reject the promise.
    }
  });
};

public_users.get('/isbn/:isbn', async function (req, res) {
  // Extract the ISBN parameter from the request URL
  const isbn = req.params.isbn;
  try {
    const book = await getBooksByIsbn(isbn); // Wait for the async operation
    res.json(book); //Send the book details as the response 
  } catch (error) {
    res.status(404).json({ message: error }); // If error occurs (such as the book is not found), send error message
  }
 });
  
// Simulate an asynchronous operation to get books by author
const getBooksByAuthor = async (author) => {
  return new Promise((resolve, reject) => {
    // Filter book list by the provided author (case insensitive)
    let booksByAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
    if (booksByAuthor.length > 0) {
      resolve(booksByAuthor); // Resolve the Promise with the filtered books
    } else {
      reject("No books found by this author."); // Reject the Promise w/ an Error message
    }
  });
};

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  // Extract the author parameter from the request URL (similarly to ISBN)
  const author = req.params.author;
  try {
    const booksByAuthor = await getBooksByAuthor(author); // Wait for the operation
    res.json(booksByAuthor); // Send the books by the author as a response
  } catch (error) {
    res.status(404).json({ message: error }); 
  }
});

// Task 13 - Simulate an asynchronous operation to get books by Title
const getBooksByTitle = async (title) => {
  return new Promise((resolve, reject) => {
    let booksByTitle = Object.values(books).filter(book=> book.title.toLowerCase() === title.toLowerCase());
    if (booksByTitle.length > 0) {
      resolve(booksByTitle);
    } else {
      reject("No books found by this title"); 
    }
  });
};

// Get all books based on title (Task 13)
public_users.get('/title/:title', async function (req, res) {
  // Same request as previous examples (get title from URL)
  const title = req.params.title;
  try {
    const booksByTitle = await getBooksByTitle(title);
    res.json(booksByTitle);
  } catch {
    res.status(404).json({ message: error});
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
