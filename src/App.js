import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Header from './Header';
import Search from './Search';
import Rack from './Rack';
import {Route} from 'react-router-dom'

class App extends React.Component {

  state = {
    books: []
  };
  
  //using BooksAPI getALL method that fetch books data
  componentDidMount(){
    localStorage.getItem('myStorage')? 
    this.setState({books: JSON.parse(localStorage.getItem('myStorage'))}) : 
    (BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=> ({books}))
      localStorage.setItem('myStorage',JSON.stringify(books))
    })
     )     
  };

  componentDidUpdate(){
   localStorage.removeItem('myStorage');
   localStorage.setItem('myStorage',JSON.stringify(this.state.books));       
  }

  //update state with newid Book
  updateStateOfBooks=(book)=>{
    this.setState({books: [...this.state.books.concat(book)]})
  };

  //shelf to shelf change
  shelfToShelf=(e)=>{
    let id = e.target.id;
    let shelf = e.target.value;
    console.log("sheftoshelf",id,shelf);
    //find the book and change the shelf value
    this.setState({books: [...this.state.books.filter((book)=> book.id===id ? book.shelf=shelf : book.shelf)]})
  console.log("shelfToShelfbooks",this.state.books);
};
     
  //bookshelf array that hods self title
  bookShelves = ["Currently Reading","Want to Read","Read"];

  render() {
  console.log('books new array',this.state.books);
    return (
      <div className="app">
      <Route exact path='/' render={()=>(
        <div>
           <Header/>
           <Rack books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} bookShelves={this.bookShelves} bookSelfTitle="Currently Reading" shelfName="currentlyReading" shelfToShelf={this.shelfToShelf}/>
           <Rack books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} bookShelves={this.bookShelves} bookSelfTitle="Want to Read" shelfName="wantToRead" shelfToShelf={this.shelfToShelf}/>
           <Rack books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} bookShelves={this.bookShelves} bookSelfTitle="Read" shelfName="read" shelfToShelf={this.shelfToShelf}/>  
        </div>
      )} />
      <Route path='/search' render={()=>(
              <Search 
              updateStateOfBooks={this.updateStateOfBooks} searchBooks={this.state.searchBooks} bookShelves={this.bookShelves} searchResults={this.searchResults} bookSelfTitle="Search Results" shelfName="searchResults" changeShelf={this.changeShelf}/>      
        
      )}/>
   </div>)    
    
  }
}

export default App
