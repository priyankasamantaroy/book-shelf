import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom'

export class Search extends Component {

    state = {
        query: "",
        searchBooks :[]  
    };

    //query will update whateven entered in the input box
    updateQuery =(query)=>{
      this.setState(()=>({
        query: query.trim()        
      })      
      )
      BooksAPI.search(query,20)
      .then((searchBooks)=>{
      this.setState(()=> ({searchBooks: searchBooks}))
    })
  };

  //change shelf
  changeShelf=(e)=>{
      let id = e.target.id;
      let shelf = e.target.value;  
      console.log("My Value", id, shelf);
      //remove id from searchBooks that has selected and update searchBooks list
      this.setState({searchBooks: [...this.state.searchBooks.filter(searchBook => searchBook.id !== id)]})
    /*update the removed id with a book object along with shelf value 
    concate the updated new book with bookslist */
      BooksAPI.get(id)
      .then((book)=>{
        book.shelf=shelf
        return book
      })
      .then((book)=> this.props.updateStateOfBooks(book))
  };      

    render() {
      console.log('res', this.state.data);
      console.log('searchBooks', this.state.searchBooks);
      //destructuring
      const {bookSelfTitle,shelfName,bookShelves} = this.props;
        return (
            <div>
              <div className="search-books">
              <div className="search-books-bar">
                <Link  to="/" className="close-search">Close</Link>              
              <div className="search-books-input-wrapper">               
                <input type="text" 
                placeholder="Search by title or author" 
                onChange={(e)=>this.updateQuery(e.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
            {(this.state.searchBooks.map((book)=>(
                         <li key={book.id}>
                         <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer"> 
                            <select id={book.id} onChange={(e)=> this.changeShelf(e)}>
                           <option value="none" selected> Select Below Options</option>                 
                             {bookShelves.map((bookshelf)=>(                      
                              bookshelf!== "" ?                               
                               <option value={bookshelf==='Currently Reading' ? 'currentlyReading' : bookshelf==='Want to Read' ? 'wantToRead' : 'read'}>{bookshelf}</option> : ""))}
                             </select> 
                            </div>
                          </div>
                          <div className="book-title">Title:{book.title}</div>
                          <div className="book-authors">Author:{book.authors.map((author)=> <span>{author}</span>)}</div>
                        </div>
                      </li>))
             )}
             </ol>
            </div>
          </div> 
        </div>
    
      

        )
    }
}

export default Search
