import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

function SetBirthYear({ authors }) {
  //   const [name, setName] = useState('Robert Martin');
  const [born, setBorn] = useState(1982);
  const [selectedAuthor, setSelectedAuthor] = useState(0);

  useEffect(() => {
    setSelectedAuthor(authors[0]);
  }, []);

  const [changeBookForm] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      if (error) {
        console.log(error);
      }
    }
  });

  function handleChange(e) {
    setSelectedAuthor(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    changeBookForm({
      variables: { name: selectedAuthor, born }
    });
    console.log(selectedAuthor, born);
  }
  // https://www.pluralsight.com/guides/how-to-get-selected-value-from-a-mapped-select-input-in-react
  return (
    <div>
      {/* {JSON.stringify(authors)} */}
      <select value={selectedAuthor} onChange={handleChange}>
        {authors.map((author, i) => (
          <option key={i} value={author}>
            {author}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        {/*   <label>
          name
          {/* <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
          /> 
        {JSON.stringify(selectedAuthor)} 
        </label>*/}
        <label>
          born
          <input
            type='number'
            name='year'
            onChange={e => setBorn(Number(e.target.value))}
            value={born}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default SetBirthYear;
