import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import SetBirthYear from './SetBirthYear';

const Authors = props => {
  const result = useQuery(ALL_AUTHORS);

  let authors;
  if (result.loading) {
    return <div>loading...</div>;
  } else {
    authors = result.data.allAuthors;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors &&
            authors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <SetBirthYear />
    </div>
  );
};

export default Authors;
