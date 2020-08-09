
import React, { Component } from 'react';
import '../../styles/GoogleBtn.css';

function GoogleBtn() {
  return (
    <a href="https://accounts.google.com/o/oauth2/auth?access_type=online&client_id=558989367504-643ecdespr7uljki4da6vn1qfflj052a.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fsignin&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly&state=state-token">
      <div id="gSignInWrapper">
        <span class="label">Sign in with :  </span>
        <div id="customBtn" class="customGPlusSignIn">
          <span class="icon"></span>
          <span class="buttonText">Google</span>
        </div>
      </div>
    </a>
  )
}

export default GoogleBtn;
