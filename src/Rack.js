import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export class Rack extends Component {
    render() {
       //destructuring
       const {books,bookSelfTitle,shelfName, shelfToShelf,shelfObject} = this.props;
        return (           
          <div className="list-books">                         
            <div className="list-books-content">
            <div className="open-search">
              <Link to='/search'>Add a book</Link>        
            </div>
                <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{bookSelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">  
                      {books.map((book,index)=>(
                        book.shelf === shelfName ? 
                        <li key={index}>
                          <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193,backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
                            <div className="book-shelf-changer"> 
                            <select defaultValue={book.shelf} id={book.id} onChange={(e)=> shelfToShelf(e)}>                            
                            {
                              Object.keys(shelfObject).map((bs,index)=>(
                                book.shelf===bs?
                                <option key={index} value={bs} >{shelfObject[bs]}</option> :
                                bs==="none"? <option key={index} value="none" >None</option> :
                                <option key={index} value={bs}>{shelfObject[bs]}</option>
                              ))
                            }
                            </select> 
                                               
                            </div>
                          </div>
                          <div className="book-title">Title:{book.title}</div>
                          <div className="book-authors">Author:{book.authors.map((author,index)=> <span key={index}>{author}</span>)}</div>
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
