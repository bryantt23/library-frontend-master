import React, { useState, useEffect } from 'react';
import BooksTable from './BooksTable';
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

function Recommendations({ show }) {
  // const [genre, setGenre] = useState('');
  let genre, books;
  const result = useQuery(ALL_BOOKS);
  const me = useQuery(ME);

  if (result.loading) {
    return <div>loading...</div>;
  } else {
    books = result.data.allBooks;
    genre = me.data.me.favoriteGenre;
  }

  console.log(genre);

  if (!show) {
    return null;
  }

  books = books.filter(book => book.genres.includes(genre));

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>
      <BooksTable books={books} />
    </div>
  );
}

export default Recommendations;
