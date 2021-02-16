import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LogIn from './components/LogIn';
import Recommendations from './components/Recommendations';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import { useApolloClient, useSubscription } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('books');
  const [token, setToken] = useState(null);
  let userButtons;
  const client = useApolloClient();
  const result = useQuery(ALL_BOOKS);
  let books;
  if (!result.loading) {
    books = result.data.allBooks;
  }

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const updateCacheWith = ({ bookAdded }) => {
    const includedIn = (set, object) =>
      set.map(b => b.title).includes(object.title);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, bookAdded)) {
      console.log(dataInStore.allBooks);
      debugger;
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded) }
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data;
      window.alert(JSON.stringify(subscriptionData));
      updateCacheWith(addedBook);
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    // client.resetStore();
  };

  if (!token) {
    userButtons = (
      <span>
        <button onClick={() => setPage('login')}>login</button>
      </span>
    );
  } else {
    userButtons = (
      <span>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </span>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {userButtons}
      </div>

      <Authors show={page === 'authors'} />

      {books && <Books books={books} show={page === 'books'} />}

      <NewBook show={page === 'add'} />

      {token && <Recommendations show={page === 'recommend'} />}

      <LogIn show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
