const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
require('dotenv').config(); // Load environment variables


let users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" }
];

// Function to check if user exists
const isValid = (username)=>{ //returns boolean
  let usersWithSameName = users.filter((user) => {
    return user.username === username;
  });
  return usersWithSameName.length > 0;
};

// Function to check if the user is authenticated
const authenticatedUser = (username,password)=>{ //returns boolean
  let validUsers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validUsers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  // Check if the username is valid and the password matches
  if (authenticatedUser(username, password)) {
    // Create a JWT token
    const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Save the JWT token in the session
    req.session.authorization = { accessToken, username };
    console.log("Session after login:", req.session);
    // Return success response
    return res.status(200).json({ message: "Login successful!", accessToken });
  } else {
    // Return error if credentials are invalid
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  console.log("Session data on review:", req.session);  // Debug log to verify session data
  // Check if the user is authenticated (i.e. if there's a session)
  if (!req.session.authorization) {
    return res.status(403).json({ message: "You must be logged in to add a review!" });
  }

  // Extract the review from the request body and the ISBN from the URL paramaters
  const { review } = req.body; // Expecting the review in the request body
  const { isbn } = req.params; // ISBN passed in the URL as a parameter
  const username = req.session.authorization.username; // Get the username from the session


  if (!review) {
    return res.status(400).json({ message: "Review text is required."});
  }

  // Find the book by its ISBN in the "books" collection
  let book = books[isbn];

  // If the book doesn't exist, return a 404 error
  if (!book) {
    return res.status(404).json({ message: "Book not found."});
  }

  if (!book.reviews) book.reviews = {};
  book.reviews[username] = review; // Either updates or creates the review

  return res.status(200).json({
    message: `Your review for the book with ISBN: ${isbn} has been added or updated.`,
    reviews: book.reviews
  });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
