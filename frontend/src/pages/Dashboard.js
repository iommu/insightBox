import React from 'react';
import Client from './components/Client';
import { gql } from '@apollo/client';

function Dashboard() {
  if (localStorage.getItem('token')!=null) {
    Client().query({
      query: gql`
      query {
        user {
          id
        }
      }`
    }).then(result => document.getElementById("hello").innerHTML = document.getElementById("hello").innerHTML + result.data.user.id);
  } // TODO goto /
  return (
    <div>
      <div class="homepage-content">
        <h1 id="hello" >Hello </h1>
      </div>
    </div>
  );
}

export default Dashboard;