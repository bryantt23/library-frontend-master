import React, { useState, useEffect } from 'react';
import { LOGIN } from '../queries';
import { gql, useMutation } from '@apollo/client';

function LogIn({ show, setToken, setPage }) {
  const [name, setName] = useState('bry');
  const [password, setPassword] = useState('secret');

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      if (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    if (result.data) {
      console.log(result);
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('user-token', token);
      setPage('authors');
    }
  }, [result.data]); //eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, password);
    login({
      variables: { username: name, password }
    });
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          name{' '}
          <input
            type='name'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          password{' '}
          <input
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default LogIn;
