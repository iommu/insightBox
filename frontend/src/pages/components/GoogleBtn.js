
import React from 'react';
import '../../styles/GoogleBtn.css';
import AuthButton from './Oauth';

function GoogleBtn() {
  return (
    <AuthButton>
      <div id="gSignInWrapper">
        <span class="label">Sign in with :  </span>
        <button id="customBtn" class="customGPlusSignIn" >
          <span class="icon"></span>
          <span class="buttonText">Google</span>
        </button>
      </div>
    </AuthButton>
  )
}

export default GoogleBtn;
