import React, { Component } from 'react';

export class Rack extends Component {
    render() {
       // console.log("title",typeof(this.props.bookselftitle));
       //destructuring
       const {books,bookselftitle,shelfname, bookshelfs} = this.props;
        return (    
                
            <div className="list-books-content">
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
                            <select>
                            <option value="none" disabled> Move to...</option>                       
                             {bookshelfs.map((bookshelf)=>(                      
                               bookshelf!== bookselftitle ?                               
                               <option value={book.shelf}>{bookshelf}</option> : ""))}
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

export default Rack;
