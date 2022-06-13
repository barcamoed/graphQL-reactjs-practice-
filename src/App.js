import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";

import BookList from "./components/BookList";
import { useState } from "react";


// spolo client setup
const apolloClient = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()
}) 


function App() {
  // const [newBook,setNewBook] = useState({});

  return (
    <ApolloProvider client={apolloClient}>
    <div className="App">

      <h1>Reading List</h1>
      <BookList/>
      <br/>
    </div>
    </ApolloProvider>
  );
}

export default App;
