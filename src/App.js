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

  render() {
    //console.log('books array',this.state.books)
    return (
      <div className="app">
      <Rack books={this.state.books} bookselftitle="Currently Reading" shelfname="currentlyReading"/>
      <Rack books={this.state.books} bookselftitle="Want to Read" shelfname="wantToRead"/>
      <Rack books={this.state.books} bookselftitle="Read" shelfname="read"/>  
      </div>
      )
  }
}
export default App
