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
  //check local storage ? get items : call API and store in myStorage locally
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
//updating local storage
  componentDidUpdate(){
   localStorage.removeItem('myStorage');
   localStorage.setItem('myStorage',JSON.stringify(this.state.books))        
  };

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

  //Shelf name object
  shelfObject = {
    "none": "None",
    "currentlyReading" : "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read"
  }

  render() {
  console.log('books new array',this.state.books);
    return (
      <div className="app">
      <Route exact path='/' render={()=>(
        <div>
           <Header/>
           <Rack books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} bookSelfTitle="Currently Reading" shelfName="currentlyReading" shelfToShelf={this.shelfToShelf} shelfObject={this.shelfObject}/>
           <Rack books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} bookSelfTitle="Want to Read" shelfName="wantToRead" shelfToShelf={this.shelfToShelf} shelfObject={this.shelfObject}/>
           <Rack books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} bookSelfTitle="Read" shelfName="read" shelfToShelf={this.shelfToShelf} shelfObject={this.shelfObject}/>  
        </div>
      )} />
      <Route path='/search' render={()=>(
          <Search 
          books={this.state.books} updateStateOfBooks={this.updateStateOfBooks} searchResults={this.searchResults} bookSelfTitle="Search Results" shelfName="searchResults" changeShelf={this.changeShelf} bookShelvesLong={this.bookShelvesLong} shelfObject={this.shelfObject}/>   
        
      )}/>
   </div>)    
    
  }
}

export default App
