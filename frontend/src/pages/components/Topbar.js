import React from 'react';
import logo from '../../images/logo.png';
import '../../styles/App.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthButton from './Oauth'

function Topbar() {
  return (
    <div className="topbar">
      <Switch>
        <Route path={["/dashboard", "/signin"]}>
          <Link to="/">
            <img src={logo} alt="insightBox" width="75" />
            <span id="logo-title"><b style={{ color: "#000" }}>insightBox</b></span>
          </Link>
        </Route>
        <Route path="/">
          <Link to="/">
            <img src={logo} alt="insightBox" width="75" />
            <span id="logo-title"><b style={{ color: "#000" }}>insightBox</b></span>
          </Link>
          <div class="topbar-links">
            <Link to="/">
              Home
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/about">
              About
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/privacypolicy">
              Privacy Policy
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/termsofuse">
              Terms Of Use
            </Link>
          </div>
          <div id="signup-login">
            <AuthButton> 
              <button class="signup-button">Sign Up</button>
              <button class="login-button">Login</button>
            </AuthButton>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Topbar;