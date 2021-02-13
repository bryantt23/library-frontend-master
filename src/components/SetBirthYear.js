import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

function SetBirthYear() {
  const [name, setName] = useState('Robert Martin');
  const [born, setBorn] = useState(1982);

  const [changeBookForm] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      if (error) {
        console.log(error);
      }
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    changeBookForm({
      variables: { name, born }
    });
    console.log(name, born);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          name
          <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
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
