import React,{useEffect, useState} from 'react'
import {
    gql, // for parsing queries(we need it because graphql is like js but is not js)
    useMutation 
  } from "@apollo/client";


const AddBookQuery = gql`
  mutation AddBook($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
      name,
      genre,
      id
    }
  }
`;
export default function AddBook({addedBook}) {
    const [book,setBookData] = useState({bookName:'', bookGenre:''});
    const [newBook,setNewBook] = useState({});

    const [addBook, { data, loading, error }] = useMutation(AddBookQuery);

    const fieldValueChange=(e)=>{
        setBookData({...book,[e.target.name]:e.target.value})
    }

    const addNewBook=()=>{
        // console.log('boooookkk',book);
        addBook({
            variables: {
              name: book.bookName,
              genre:book.bookGenre,
              authorId:"62a1a26cc2e23c785617f882"
            },
          })
        setBookData({bookName:'', bookGenre:''})
    }
    
    if(loading){console.log('Loading...',loading)}
    if(error){console.log('Errorrrrr',error)}
    if(data && Object.keys(newBook).length==0){
      setNewBook(data);
  }

  useEffect(()=>{
    if(Object.keys(newBook).length!=0){
      addedBook(newBook)
    }
  },[newBook])

  return (
    <>
    <div>
        <h1>Add Book</h1>
        <div>
            <label> Book Name </label>
            <input type={'text'} name="bookName" onChange={(e)=>fieldValueChange(e)} value={book['bookName']}/>
            <br></br>
            <label> Book Genre </label>
            <input type={'text'} name="bookGenre" onChange={(e)=>fieldValueChange(e)} value={book['bookGenre']}/>
            <br></br>
            <button onClick={addNewBook}> Add</button>
        </div>
    
    </div>
    </>
    
  )
}
