import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Rack from './Rack';
import Search from './Search';

class App extends React.Component {
  state = {
    books: []
   // showSearchPage: false
     //will add the resulting searched books array from search API
  }  
  
  //using BooksAPI getALL method that fetch books data
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=> ({books}))
    })
  }

  //update state with newid Book
  updateStateofBooks=(book)=>{
    this.setState({books: [...this.state.books.concat(book)]})
   // console.log("booksArraynew",this.state.books);
  }

  //shelf to shelf change
  shelfToshelf=(e)=>{
    let id = e.target.id;
    let shelf = e.target.value;
    console.log("sheftoshelf",id,shelf);
    //find the book and change the shelf value
    this.setState({books: [...this.state.books.filter((book)=> book.id===id ? book.shelf=shelf : book.shelf)]})
  console.log("shelftoshelfbooks",this.state.books) 
}
     
  //bookshelf array that hods self title
  bookshelfs = ["Currently Reading","Want to Read","Read"]

  render() {
  console.log('books new array',this.state.books)
    return (
      <div className="app">
      <Search updateStateofBooks={this.updateStateofBooks} searchBooks={this.state.searchBooks} bookshelfs={this.bookshelfs} searchResults={this.searchResults} bookselftitle="Search Results" shelfname="searchResults" changeshelf={this.changeshelf}/>      
      <Rack books={this.state.books} updateStateofBooks={this.updateStateofBooks} bookshelfs={this.bookshelfs}  bookselftitle="Currently Reading" shelfname="currentlyReading" shelfToshelf={this.shelfToshelf}/>
      <Rack books={this.state.books} updateStateofBooks={this.updateStateofBooks} bookshelfs={this.bookshelfs} bookselftitle="Want to Read" shelfname="wantToRead" shelfToshelf={this.shelfToshelf}/>
      <Rack books={this.state.books} updateStateofBooks={this.updateStateofBooks} bookshelfs={this.bookshelfs} bookselftitle="Read" shelfname="read" shelfToshelf={this.shelfToshelf}/>  
      </div>
      )
  }
}
export default App
