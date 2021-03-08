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
           // .catch(error => //console.log('errormessage:',error));//this.setState({searchBooks: []}))        
        } 
        
      // localStorage.setItem('mySearchStorage',JSON.stringify(searchBooks))
      //console.log('Query', query)
    }; //end of update


    preProcessing(searchResults){ 
      try{ 
      //console.log("API results stored var", searchResults)
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
    }//try end

    catch(e){
      searchResults=[]
    }//catch end

    finally{
      return searchResults
    }//end finally

    };//end of preProcessing



  //change shelf
  changeShelf=(e)=>{
      let id = e.target.id;
      let shelf = e.target.value;  
      //console.log("My Value", id, shelf);
    /*update the removed id with a book object along with shelf value 
    concate the updated new book with bookslist */
      BooksAPI.get(id)
      .then((book)=>{
       //book.shelf=shelf
        return book
      })
      .then((book)=>this.props.updateStateOfBooks(book,shelf))
  };
  
    render(){
      //console.log('State searchBooks', this.state.searchBooks);
      //destructuring
      const {shelfObject} = this.props
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
              <h2>Search Results: {this.state.searchBooks.length} Books</h2>
              <ol className="books-grid">
            {this.state.searchBooks.map((book)=>(
                         <li key={book.id}>
                         <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer"> 
                            <select defaultValue={book.shelf} id={book.id} onChange={(e)=> this.changeShelf(e)}>                            
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
                      </li>))}
             </ol>
            </div>
          </div> 
        </div>    

        )
    }

  }

export default Search
