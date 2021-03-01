import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom'

export class Search extends Component {

    state = {
        query: "",
        searchBooks :[]  
    };

    //query will update whatever entered in the input box and will save as local storage
      updateQuery =(query)=>{
        query=query.trim()
        this.setState(()=>({
          query: query        
        })      
        )
        // this.state.query === "" ?
        query === "" ?
        this.setState({searchBooks: []}) :
        BooksAPI.search(query,20)
        .then((searchBooks)=>{searchBooks!== undefined ? 
          this.setState({searchBooks: searchBooks.filter((searchBook)=>(searchBook.authors!== undefined && searchBook.imageLinks!== undefined))}) :this.setState({searchBooks: []})
      // localStorage.setItem('mySearchStorage',JSON.stringify(searchBooks))
      })
      console.log('Query', query)
    };
  // //updating local storage
  // componentdidUpdate(){
  //   localStorage.removeItem('mySearchStorage');
  //   localStorage.setItem('mySearchStorage',JSON.stringify(this.state.searchBooks))        
  //  };

  //change shelf
  changeShelf=(e)=>{
      let id = e.target.id;
      let shelf = e.target.value;  
      console.log("My Value", id, shelf);
      
      //remove id from searchBooks that has selected and update searchBooks list
      this.setState({searchBooks: [...this.state.searchBooks.map(searchBook => searchBook.id === id ?  searchBook.shelf : "none")]})
    /*update the removed id with a book object along with shelf value 
    concate the updated new book with bookslist */
      BooksAPI.get(id)
      .then((book)=>{
        book.shelf=shelf
        return book
      })
      .then((book)=>this.props.updateStateOfBooks(book))
  };
  
    render(){
      console.log('res', this.state.data);
      console.log('State searchBooks', this.state.searchBooks);
      //destructuring
      const {books,bookSelfTitle,shelfName,bookShelves} = this.props
     // const selected = shelfName===bookSelfTitle ? selected : "";
        return (
            <div>
              <div className="search-books">
              <div className="search-books-bar">
                <Link  to="/" className="close-search">Close</Link>              
              <div className="search-books-input-wrapper">               
                <input type="text"
                //value={this.state.query} 
                placeholder="Search by Title or Author" 
                onChange={(e)=>this.updateQuery(e.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
            {this.state.searchBooks.map((book)=>(
                         <li key={book.id}>
                         <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer"> 
                            <select id={book.id} onChange={(e)=> this.changeShelf(e)}>                            
                            {books.map((rackbook)=>(
                              rackbook.id===book.id ? (
                                  <option value="none">None</option> 
                                  {bookShelves.map((bookshelf)=>(
                                    bookshelf===rackbook.shelf ? ( 
                                    <option value={bookshelf} selected >{bookshelf}</option>)
                                    : <option value={bookshelf}>{bookshelf}</option>))})
                              : 
                               (<option value="none" selected>None</option>
                                 {bookShelves.map((bookshelf)=>(<option value={bookshelf}>{bookshelf}</option>))})
                              ))}                                              
                            </select> 
                            </div>
                          </div>
                          <div className="book-title">Title:{book.title}</div>
                          <div className="book-authors">Author:{book.authors.map((author)=> <span>{author}</span>)}</div>
                        </div>
                      </li>))}
             </ol>
            </div>
          </div> 
        </div>
      

        )
    }

  }

export default Search
