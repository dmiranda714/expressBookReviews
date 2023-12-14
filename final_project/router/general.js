const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username && password) {
    if(!isValid(username)) {
        users.push({
            "username" : username,
            "password" : password
        });
        return res.status(200).json({message: "User successfully registered, now you can login."});
    }
    else{
        return res.status(404).json({message: "user already exists"})
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });

      get_books.then(() => console.log("Promise for Task 10 resolved"));

  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let filtered_book = books[isbn];
  const get_booksByISBN = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({filtered_book}, null, 4)));
  });
    get_booksByISBN.then(() => console.log("Promise for Task 11 resolved"));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/books/author/:author',function (req, res) {

    const get_books_author = new Promise((resolve, reject) => {
        let booksbyauthor = [];
        let isbns = Object.keys(books);
    
        isbns.forEach((isbn) => {
          if (books[isbn]["author"] === req.params.author) {
            booksbyauthor.push({
              "isbn": isbn,
              "title": books[isbn]["title"],
              "reviews": books[isbn]["reviews"]
            });
          }
        });
    
        if (booksbyauthor.length > 0) {
          resolve(res.send(JSON.stringify({ booksbyauthor }, null, 4)));
        } else {
          reject(res.send("The mentioned author does not exist"));
        }
      });
    
      get_books_author
        .then(function () {
          console.log("Promise is resolved");
        })
        .catch(function () {
          console.log("The mentioned author does not exist");
        });
    
    });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 
  const get_books_title = new Promise((resolve, reject) => {
  let booksByTitle = [];
  let isbns = Object.keys(books);

  isbns.forEach((isbn) => {
        if(books[isbn]["title"] === title) {
        booksByTitle.push({
            "isbn" : isbn,
            "title": books[isbn]["title"],
            "reviews": books[isbn]["reviews"]
        });
  }
  });

  if (booksByTitle.length > 0) {
    resolve(res.send(JSON.stringify({ booksByTitle }, null, 4)));
  } else {
    reject(res.send("The mentioned title does not exist"));
  }
});

get_books_title
  .then(function () {
    console.log("Promise is resolved");
  })
  .catch(function () {
    console.log("The mentioned author does not exist");
  });

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
