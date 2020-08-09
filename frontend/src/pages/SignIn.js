import React from 'react';
import '../styles/App.css';
import {
  Redirect
} from "react-router-dom";

import Client from './components/Client';
import { gql } from '@apollo/client';

function SignIn() {
  // check if we have a auth code in URL
  const url = new URLSearchParams(window.location.search);
  const code = url.get('code');
  if (code != null) {
    Client().mutate({
      mutation: gql`
    mutation{
      signIn(authCode: "${code}")
    }`
    }).then(result => {
      if (result.data.signIn) {
        console.log("token saved");
        localStorage.setItem("token", result.data.signIn);
        localStorage.setItem("loggedIn", true);
      } else {
        console.log("token blank");
      }
    });
  }
  return (
    <Redirect to="/dashboard" />
  );
}

export default SignIn;