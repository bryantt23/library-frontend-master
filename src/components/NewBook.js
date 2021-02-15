import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries';

const NewBook = props => {
  const [title, setTitle] = useState('title');
  const [author, setAuhtor] = useState('author');
  const [published, setPublished] = useState(1234);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [changeBookForm] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: error => {
      if (error) {
        console.log(error);
      }
    }
  });

  if (!props.show) {
    return null;
  }

  const submit = async event => {
    event.preventDefault();

    console.log('add book...');

    changeBookForm({
      variables: { title, published: parseInt(published), author, genres }
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
