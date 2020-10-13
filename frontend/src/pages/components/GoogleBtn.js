import React from "react";
import "../../styles/GoogleBtn.css";
import AuthButton from "./Oauth";

export default () => (
  <AuthButton>
    <div id="gSignInWrapper">
      <span className="label">Sign in with : </span>
      <button id="customBtn" className="customGPlusSignIn">
        <span className="icon"></span>
        <span className="buttonText">Google</span>
      </button>
    </div>
  </AuthButton>
);
