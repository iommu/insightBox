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

export const User = () => {
  const [result, getDayData] = useQuery({
    query: `
    query {
      data(start:"2020-08-07 00:00:00", end:"2020-08-07 00:00:00") {
        id,
        date
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
    <p> Welcome</p>
  );
}