import React from "react";
import "../../styles/GoogleBtn2.css";
import AuthButton from "./Oauth";

export default () => (
  <AuthButton>
    <div id="gSignInWrapper">
      <button id="customBtn2" className="customGPlusSignIn">
        <span className="icon2"></span>
        <span className="buttonText2">Sign in with Google</span>
      </button>
    </div>
  </AuthButton>
);
