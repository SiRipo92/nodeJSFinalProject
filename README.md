# Final Project: Online Book Review Application
### Author: Sierra Ripoche

This repository contains the final project for **Module 4** of the course, [Developing Backend Apps with Node.js and Express](https://www.coursera.org/learn/developing-backend-apps-with-nodejs-and-express/home/module/4), on Coursera. The goal of this project is to build a server-side application for managing book reviews using Node.js and Express.js, incorporating features such as CRUD operations, authentication, and asynchronous operations.

## Project Overview

In this project, I have created a RESTful API for an online bookshop. The application allows users to:

- **Browse all books**: Retrieve a list of all books in the shop.
- **Search for books**: Search for books by ISBN, author, or title.
- **View reviews**: Retrieve reviews for specific books.
- **Register as a user**: New users can register for the app.
- **Login**: Users can log in to access personalized features.
- **Add, modify, and delete reviews**: Logged-in users can add reviews, modify their own reviews, and delete their reviews.

The application also incorporates **JWT** and **session authentication** to restrict certain actions to logged-in users only.

### Key Features:

1. **Retrieve a list of books** from the database.
2. **Search by ISBN**, **author**, and **title**.
3. **View and manage reviews** for books.
4. **User authentication** with JWT and session management for secured access.
5. **CRUD operations** on reviews (only accessible to logged-in users).
6. **Async/Await and Promises** for handling asynchronous operations.

## Prerequisites

Before starting this project, you need to complete the following labs:
1. Hands-on Lab: CRUD operations with Node.js.
2. Practice Project: CRUD operations on an Express server with JWT & Session Authentication.

## Setup and Installation

### 1. Fork and Clone the Repository

- Fork this repository and clone it into your local development environment.

### 2. Install Dependencies

Navigate to the Express server directory and run:

```bash
npm install

```
### 3. Start server
```bash
npm start
```
### 3. Testing API Endpoints
You can test the API using Postman. Use your Google mail credentials to register or log in, and test the following endpoints:

- GET /books: Retrieve a list of all books.
- GET /books/ :  Retrieve a book by ISBN.
- GET /books/author/ : Retrieve books by author.
- GET /books/title/ : Retrieve books by title.
- POST /register : Register a new user.
- POST /login : Login with an existing user.
- POST /reviews : Add a new review for a book.
- PUT /reviews/ : Modify an existing review.
- DELETE /reviews/ : Delete a review.

## Project Breakdown / Grading Rubric: 
The following describes how I'll be graded for this project.

### General Users
  1. Get the book list available in the shop. - 2 Points
  2. Get books based on ISBN. - 2 Points
  3. Get all books by author. - 2 Points
  4. Get all books by title. - 2 Points
  5. Get book review. - 2 Points
  6. Register a new user. - 3 Points
  7. Login as a registered user. - 3 Points

### Registered Users
  8. Add/modify a book review - 2 Points
  9. Delete a book review added by that particular user. - 2 Points

### Async/Await or Promises with Axios
  10. Get all books using async callback function - 2 Points
  11. Search books by ISBN using Promises - 2 Points
  12. Use Promises to Search by Author - 2 Points
  13. Use Promises to Search by Title - 2 Points


### Submission
  14. [Submit the GitHub URL of your Book Review application code](https://github.com/SiRipo92/nodeJSFinalProject) - 2 Points
