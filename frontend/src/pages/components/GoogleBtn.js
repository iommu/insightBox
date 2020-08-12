
import React from 'react';
import '../../styles/GoogleBtn.css';
import * as Consts from './Consts';

function GoogleBtn() {
  return (
    <a href={Consts.OAUTHLINK}>
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
