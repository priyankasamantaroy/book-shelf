import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom'

export class Search extends Component {

    state = {
        searchBooks :[]  
    };

    //query will update whatever entered in the input box and will save as local storage
      updateQuery =(query)=>{
        query=query.trim()
        
        if(query === ""){
          this.setState({searchBooks: []})
        }
        else{
          BooksAPI.search(query, 20)
            .then(searchBooks => this.preProcessing(searchBooks))
            .then(searchBooks => this.setState({searchBooks: searchBooks})) 
           // .catch(error => console.log('errormessage:',error));//this.setState({searchBooks: []}))        
        } 
        
      // localStorage.setItem('mySearchStorage',JSON.stringify(searchBooks))
      console.log('Query', query)
    }; //end of update


    preProcessing(searchResults){
      console.log("API results stored var", searchResults)
      if(searchResults!== undefined){
        searchResults = searchResults.filter((searchBook)=>(
          searchBook.authors!== undefined && searchBook.imageLinks!== undefined))    
          
          for(let i=0; i<searchResults.length; i++){
            for(let j=0; j<this.props.books.length; j++){
              if(searchResults[i].id === this.props.books[j].id){
                searchResults[i].shelf = this.props.books[j].shelf
              }
            }
          }
    
      }//if end
      else{
        searchResults=[]
      }
      return searchResults;
    };//end of preProcessing



  //change shelf
  changeShelf=(e)=>{
      let id = e.target.id;
      let shelf = e.target.value;  
      console.log("My Value", id, shelf);
      //remo id from searchBooks that has selected and update searchBooks list
     // this.setState({searchBooks: [...this.state.searchBooks.filter(searchBook => searchBook.id === id ?  searchBook.shelf=shelf : "None")]})
    /*update the removed id with a book object along with shelf value 
    concate the updated new book with bookslist */
      BooksAPI.get(id)
      .then((book)=>{
       // book.shelf=shelf
        return book
      })
      .then((book)=>this.props.updateStateOfBooks(book,id,shelf))
  };
  
    render(){
      console.log('State searchBooks', this.state.searchBooks);
      //destructuring
      const {books,bookSelfTitle,shelfName,bookShelves, bookShelvesLong,shelfObject} = this.props
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
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer"> 
                            <select id={book.id} onChange={(e)=> this.changeShelf(e)}>                            
                            {
                              Object.keys(shelfObject).map((bs)=>(
                                book.shelf===bs?
                                <option value={bs} selected>{shelfObject[bs]}</option> :
                                bs==="none"? <option value="" selected>None</option> :
                                <option value={bs}>{shelfObject[bs]}</option>
                              ))
                            }
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
