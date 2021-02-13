import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';


export class Search extends Component {

    state = {
        query: "",
        showSearchPage: false,
        searchBooks :[]
    }

    

    //query will update whateven entered in the input box
    updateQuery =(query)=>{
      this.setState(()=>({
        query: query.trim()        
      })      
      )
      //using search API
      BooksAPI.search(query,20)
      .then((searchBooks)=>{
      this.setState(()=> ({searchBooks: searchBooks}))
    })
  }
  



    render() {
console.log('query', this.state.query);
console.log('searchBooks', this.state.searchBooks);
console.log('searchBooks', typeof(this.state.searchBooks));

//console.log("searchbooks",this.props.searchBooks);
//console.log("searching",this.props.searchResults("the"));
//destructuring
//const {searchBooks,bookselftitle,shelfname,bookshelfs,changeshelf} = this.props;
const {bookselftitle,shelfname,bookshelfs,changeshelf} = this.props;
        return (
            <div>
{this.state.showSearchPage ? 
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>              
              <div className="search-books-input-wrapper">               
                <input type="text" 
                placeholder="Search by title or author" 
               // value={this.state.query}
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
                            <select key={book.id.toString()}>
                            <option value="none" disabled> Move to...</option>                       
                             {bookshelfs.map((bookshelf)=>(                      
                               bookshelf!== "" ?                               
                               <option id={book.id} value={book.shelf} onChange={(e)=>changeshelf(e.target.value,e.target.id)}>{bookshelf}</option> : ""))}
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
          </div> : 
          <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
    }
        </div>

        )
    }
}

export default Search
