import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = props => {
  const result = useQuery(ALL_BOOKS);
  // const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  let genreButtons;

  // useEffect(() => {
  //   if (genres) {
  //     createGenreButtons();
  //   }
  // }, [genres]);

  let books;
  if (result.loading) {
    return <div>loading...</div>;
  } else {
    books = result.data.allBooks;
    getGenres(books);
    console.log(books);
  }

  //get all genres in a set
  function getGenres(books) {
    let genres = new Set();
    books.forEach(book => {
      // https://stackoverflow.com/questions/50881453/how-to-add-an-array-of-values-to-a-set
      genres = new Set([...genres, ...book.genres]);
    });
    // setGenres(genres);
    createGenreButtons(genres);
  }

  //render genres
  function createGenreButtons(genres) {
    // console.log([...genres]);
    genreButtons = [...genres].map((genre, i) => (
      <button key={i} onClick={() => setGenre(genre)}>
        {genre}
      </button>
    ));
  }

  //onclick for each genre
  //use the click as a state
  //filter based on that state

  if (!props.show) {
    return null;
  }

  if (genre.length > 0)
    books = books.filter(book => book.genres.includes(genre));

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreButtons}
    </div>
  );
};

export default Books;
