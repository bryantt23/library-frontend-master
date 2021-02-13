import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// queries
import { ADD_BOOK } from '../queries';

const NewBook = ({ setError, show, updateCacheWith }) => {
  const [title, setTitle] = useState('aaa');
  const [author, setAuthor] = useState('bbbb');
  const [published, setPublished] = useState(123);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState(['a']);

  const [changeBookForm, result] = useMutation(ADD_BOOK, {
    onError: error => {
      if (error.graphQLErrors[0]) {
        setError(error.graphQLErrors[0]);
      }
    },
    update: (store, res) => {
      updateCacheWith(res.data.addedBook);
    }
  });

  if (!show) return null;
  if (result.loading) return <div>Now Loading... </div>;

  const submit = async event => {
    event.preventDefault();

    console.log('Create Book Successfuly');
    changeBookForm({
      variables: { title, published: parseInt(published), author, genres }
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
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
            onChange={({ target }) => setAuthor(target.value)}
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
