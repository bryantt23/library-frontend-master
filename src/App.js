import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LogIn from './components/LogIn';
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('recommend');
  const [token, setToken] = useState(null);
  let userButtons;

  useEffect(() => {
    const token = localStorage.getItem('user-token');
    if (token) {
      setToken(token);
    }
  }, []);

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

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommend'} />

      <LogIn show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
