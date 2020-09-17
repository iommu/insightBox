import React from 'react'; 
// import graphql and create client
import { useQuery } from 'urql';

// create queries
export const User = () => {
  const [result, getUsers] = useQuery({
    query: `
    query {
      user {
        id
      }
    }`
  });

  const { data, fetching, error } = result;

  if (fetching) return (
    <p> Loading user data </p>
  );

  if (error) {
    return (
      <p> Error getting user data </p>
    );
  };

  return (
    <p> Welcome {data.user.id}</p>
  );
}

export const Day = () => {
  const [result, getDayData] = useQuery({
    query: `
    query {
      data(start:"2006-01-02T15:04:05Z", end:"2026-01-02T15:04:05Z") {
        date,
        received
      }
    }`
  });

  console.log(result);

  const { data, fetching, error } = result;

  if (fetching) return (
    <p> Loading user data </p>
  );

  if (error) {
    return (
      <p> Error getting user data </p>
    );
  };

  return (
    <table>
      <tr><td>date</td>number of emails recv</tr>
      {result.data.data.map(day => (
        <tr>
          <td>{day.date}</td><td>{day.received}</td>
        </tr>
      ))}
    </table>
  );
}

export const ID = () => {
  const [result, getDayData] = useQuery({
    query: `
    query {
      user {
        given_name,
        family_name,
        picture  
      }
    }`
  });

  console.log(result);

  const { data, fetching, error } = result;

  if (fetching) return (
    <p> Loading user data </p>
  );

  if (error) {
    return (
      <p> Error getting user data </p>
    );
  };

  return (
  <div>Hello {data.user.given_name} {data.user.family_name} <img src="{data.user.picture}" /></div>
  );
}