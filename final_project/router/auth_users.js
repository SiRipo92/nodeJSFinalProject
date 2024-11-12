const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  // Check if username is valid (i.e. if it exists in the users array)
  return users.some( user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
  // Check if the username and password match in the user array
  const user = users.find(user => user.username === username);
  return user && user.password === password; // Assuming 'password' is stored in plain text
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  // Check if the username is valid and the password matches
  if (authenticatedUser(username, password)) {
    // Create a session for the authenticated user
    req.session.user = { username }; // Store the username in the session
    return res.status(200).json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //This route should only be accessible to authenticated users
  if (!req.session.user) {
    return res.status(401).json({ message: "You must be logged in to add a review!"});
  }

  const { review } = req.body;
  const { isbn } = req.params;

  // Logic to add review for the book (not implemented in this part)
  return res.status(200).json({ message: `Review for book with ISBN: ${isbn} has been added` });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
