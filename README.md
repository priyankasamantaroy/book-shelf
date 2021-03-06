# Project Description

This is a book lending App created by using `HTML` `CSS` and `REACT`.<br>
Using this app:

- User can search book with books name or author's name.
- Can add the book in designated racks.
- Also can change the book within racks if they wanted to.

# Instructions

As this project created with `Create React App`.<br>
We need to follow these instructions only.

- Clone my github link [book-shelf](https://github.com/priyankasamantaroy/book-shelf)
- To install all the project dependencies, run `npm install` in terminal.
- To start the server, run `npm start`

# Included files and folders

```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── Header.js # This is Header Component of the app.
    ├── Rack.js # This is the Rack component - can be used to display any shelves with props.
    ├── Search.js # This is the Search component.
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

# How it works/Features of the App

- The main page contains 3 shelves: Currently Reading, Want to read and Read.
- Each book object will contain a drop down box that displays shelves other than the current shelf in which the book presently in.
- User can change the shelves within racks if they wanted to.
- The same books will be displayed even after refreshing the browser.
- The main page is linked to Search page.the Search page contains a searchbar where user can search their required book.
- When the user type something for their requirement,if the query mathches, the search books will appear on the page along with name and author name. In addition to that the total count of books in search results will display at the top.
- User can add books to shelves from search page and also can change shelves of rack books from search page too.
- Books has not asigned to any shelves will selected as none.
- There is a back button on the search bar that is linked to home page, User can navigate to home page by clicking that.
