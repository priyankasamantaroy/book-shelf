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
  //shelfupdate
  changeshelf=(id,value)=>{
    console.log(id,value);
    BooksAPI.get(id)
    .then((book)=>(
     BooksAPI.update(book)
     .then((shelf)=> {
       this.setState(()=>({shelf : value}))
     }
     )))    
  }

 
  //bookshelf array that hods self title
  bookshelfs = ["Currently Reading","Want to Read","Read"]

  render() {
  console.log('books search array',this.state.books)
    return (
      <div className="app">
      <Search searchBooks={this.state.searchBooks} bookshelfs={this.bookshelfs} searchResults={this.searchResults} bookselftitle="Search Results" shelfname="searchResults" changeshelf={this.changeshelf}/>      
      <Rack books={this.state.books} bookshelfs={this.bookshelfs} changeshelf={this.changeshelf} bookselftitle="Currently Reading" shelfname="currentlyReading"/>
      <Rack books={this.state.books} bookshelfs={this.bookshelfs} bookselftitle="Want to Read" shelfname="wantToRead"/>
      <Rack books={this.state.books} bookshelfs={this.bookshelfs} bookselftitle="Read" shelfname="read"/>  
      </div>
      )
  }
}
export default App
