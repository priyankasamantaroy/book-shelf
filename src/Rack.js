import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom'

export class Rack extends Component {

    render() {
       //destructuring
       const {books,bookselftitle,shelfname, bookshelfs, shelfToshelf} = this.props;
        return (           
          <div className="list-books">                         
            <div className="list-books-content">
            <div className="open-search">
          <Link to='/Search'>Add a book</Link>           
                              
        </div>
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookselftitle}</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">  
                  {books.map((book)=>(
                     book.shelf === shelfname ? 
                     <li key={book.id}>
                         <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer"> 
                            <select id={book.id} onChange={(e)=>shelfToshelf(e)}>
                            <option value="none" selected> Move to...</option>                       
                             {bookshelfs.map((bookshelf)=>(                      
                               bookshelf!== bookselftitle ?                               
                               <option  value={bookshelf==="Currently Reading" ? "currentlyReading" : bookshelf==="Want to Read" ? 'wantToRead' : 'read'} >{bookshelf}</option> : ""))}
                             </select> 
                            </div>
                          </div>
                          <div className="book-title">Title:{book.title}</div>
                          <div className="book-authors">Author:{book.authors.map((author)=> <span>{author}</span>)}</div>
                        </div>
                      </li>       
                      :  ""))}
                      </ol>
                    </div>
                </div>
            </div>
        </div>  
      </div>                       
            
        )
    }
}

export default Rack;
