import React, { Component } from 'react'

export class ReadBooks extends Component {
    render() {
        return (
            
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">  
                  {this.props.books.map((book)=>(
                     book.shelf === "read" ? 
                     <li key={book.id}>
                         <div className="book">
                             <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value={book.shelf}>Currently Reading</option>
                                <option value={book.wantToRead}>Want to Read</option>
                                <option value={book.authorread}>Read</option>
                                <option value="none">None</option>
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
        )
    }
}

export default ReadBooks;
