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
    localStorage.removeItem("token");
    return (
      <p> Error getting user data </p>
    );
  };

  return (
    <p> Welcome {data.user.id}</p>
  );
}
