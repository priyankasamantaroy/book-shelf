import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import CurrentBooks from './CurrentBooks';
import WanttoReadBooks from './WanttoReadBooks';
import ReadBooks from './ReadBooks';
import Rack from './Rack';

class App extends React.Component {
  state = {
    books: []
   // showSearchPage: false
  }
  //using BooksAPI getALL method that fetch books data
  componentDidMount(){
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=> ({books}))
    })
  }
  //bookshelf array that hods self title
  bookshelfs = ["Currently Reading","Want to Read","Read"]

  render() {
    //console.log('books array',this.state.books)
    return (
      <div className="app">
      <Rack books={this.state.books} bookshelfs={this.bookshelfs} bookselftitle="Currently Reading" shelfname="currentlyReading"/>
      <Rack books={this.state.books} bookshelfs={this.bookshelfs} bookselftitle="Want to Read" shelfname="wantToRead"/>
      <Rack books={this.state.books} bookshelfs={this.bookshelfs} bookselftitle="Read" shelfname="read"/>  
      </div>
      )
  }
}
export default App
