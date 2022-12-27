import React, {useState} from 'react'
import axios from 'axios'
import './App.css'
const App = ()=>{
  const [searchBook , setsearchBook] = useState("");
  const [books, setBooks] = useState({items : []});
  const onInputChange = (e)=>{
    setsearchBook(e.target.value);
  }
  let API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const fetchBooks = async ()=>{
    const result = await axios.get(`${API_URL}?q=${searchBook}`);
    console.log(result);
    setBooks(result.data);
    // console.log(result.data.items.volumeInfo.selfLink);
  }
  const onSubmitHandler =(e)=>{
    e.preventDefault();
    fetchBooks();
  }
  const bookAuthors = (authors)=>{
    if(authors.length <=2){
      authors = authors.join(' and ')
    }else if(authors.length > 2){
      let lastAuthor = ' and ' + authors.slice(-1);
      authors.pop();
      authors = authors.join(', ');
      authors += lastAuthor;
    };
    return authors;
  }

  return (
    <div >
      <h1>BOOK SEARCH</h1>
    <section className=' row text-center lg-start '>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="">
  
          <input className='form-control my-3' type="search" placeholder='search books here' value={searchBook} onChange={onInputChange} />
          
          <button className='btn btn-primary mx-3 my-1' type='submit'>Search</button>
        </label>
      </form>
      <ul>
        {books.items.map((book,index)=>{
          return (
            <div className='grid-container' key={index}>
              <div className='grid-item'>
                <a href={`https://books.google.com/books/about/${book.volumeInfo.title}.html?hl=&id=${book.id}`}><img src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`} alt={`${book.volumeInfo.title} book`} /></a>
                <div>
                  <h4>{book.volumeInfo.title}</h4>
                  <p>{bookAuthors(book.volumeInfo.authors)}</p>
                  <p>{book.volumeInfo.publishedDate}</p>
                  <p>{book.volumeInfo.pageCount}</p>
                  <p>{book.volumeInfo.ratingsCount}</p>
                </div>
              </div>
          
            </div>
          );
        })}
      </ul>
    </section>
    </div>
  );


}

export default App;


