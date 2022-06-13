import React, { useEffect,useState } from 'react'
import {
    gql, // for parsing queries(we need it because graphql is like js but is not js)
    useQuery,
    useMutation  
  } from "@apollo/client";
  import AddBook from "./AddBook";



// Query construction
const getAllBooksQuery = gql`{
    allBooks{
      id,
      name,
      genre
  }}`

  const deleteBookQuery = gql`
  mutation BookList($id:ID!){
    removeBook(id:$id){
      id,
    }
  }
`;

const updateBookQuery = gql`
mutation BookList($name:String!,$genre:String!,$id:ID!){
  updateBook(name:$name,genre:$genre,id:$id){
    id,
    name,
    genre
  }
}
`;

const BookList=()=> {
    const { loading, error, data } = useQuery(getAllBooksQuery);
    const [removeBook, { data1, loading1, error1 }] = useMutation(deleteBookQuery);
    const [updateBook, { data2, loading2, error2 }] = useMutation(updateBookQuery);
    const [books, setBooks] = useState([]);
    const [show, setShowEditComponent] = useState(false);
    const [newBook, setNewBook] = useState({});
    const [book,setBookData] = useState({bookName:'', bookGenre:''});
    if(loading){console.log('Data loadinggggg')}
    if(data){console.log('DataAAAAA',data)}
    if(error){console.log('Errorrr',error)}

    if(loading1){console.log('Data loadinggggg111')}
    if(data1){console.log('DataAAAAA111',data1)}
    if(error1){console.log('Errorrr1',error1)}

    useEffect(()=>{
      if(data){
        setBooks(data.allBooks);
      }
    },[data])

    const addedBook=(book)=>{
    const NewBook = book.addBook;
    setBooks([...data.allBooks, NewBook]);
   }

   const handleDelete= async(book)=>{
      const response = await removeBook({variables:{id:book.id}});
      if(Object.keys(response.data.removeBook).length!==0 && response.data.removeBook.id){
          console.log('....On Query Successsssssss....');
          const filteredBooks = books.filter((item,index)=> item.id!==book.id);
          setBooks([...filteredBooks]);
      }
   }

   const editBook=(book)=>{
      setShowEditComponent(true);
      setBookData({...book, bookName:book.name,bookGenre:book.genre});
   }

   const fieldValueChange=(e)=>{
    setBookData({...book,[e.target.name]:e.target.value})
   }

   const updateRequest= async()=>{
     if(show && Object.keys(book).length!=0){
        console.log('JAJAJAAJJAAAAAAAAA',book);
       const response = await updateBook({
          variables:{
             id:book.id,
             name:book.bookName,
             genre:book.bookGenre
          }});
        //  if( response && Object.keys(response.data.updateBook).length!==0) {
        //    console.log('Update local dataa herererrererererer',response);
        //  }
     }
   }

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
    <div style={{width:'50%'}}>
        <ul id='book-list'>
            {books?.map((book,index)=>(
              <div style={{display:'flex',justifyContent:'flex-start',}}>
                <li key={index}>{book.name}</li>
                <span style={{marginLeft:'1rem', background:'pink', border:'1px solid red',cursor:'pointer'}}
                 onClick={()=>handleDelete(book)}> Delete 
                 </span>
                 <span style={{marginLeft:'1rem', background:'pink', border:'1px solid red',cursor:'pointer'}}
                 onClick={()=>editBook(book)}> Edit 
                 </span>
                
              </div>
            ))}
        </ul>
        <div>
          <AddBook addedBook={(book)=>addedBook(book)}/>
        </div>
    </div>
    <div style={{width:'50%'}}>
    {show && <div>
            <label> Book Name </label>
            <input type={'text'} name="bookName"  
            value={book.bookName}
            onChange={(e)=>fieldValueChange(e)}
            />
            <br></br>
            <label> Book Genre </label>
            <input type={'text'} name="bookGenre" 
            value={book.bookGenre}
            onChange={(e)=>fieldValueChange(e)}
            />
            <br></br>
            <button onClick={updateRequest}> Update </button>
        </div>
    }
    </div>
    </div>
  )
}

export default BookList 
