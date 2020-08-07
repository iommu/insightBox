import React from 'react';
import logo from '../../images/logo.png';
import '../../styles/App.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

function Topbar() {
  return (
    <div className="topbar">
      <Switch>
        <Route path="/dashboard">
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
              <a class="topbar-link-buttons">
                Home
              </a>
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/about">
              <a class="topbar-link-buttons">
                About
              </a>
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/privacypolicy">
              <a class="topbar-link-buttons">
                Privacy Policy
              </a>
            </Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/termsofuse">
              <a class="topbar-link-buttons">
                Terms Of Use
              </a>
            </Link>
          </div>
          <div id="signup-login">
            <button onClick="location.href = '/googleauth1.html';" class="signup-button">Sign Up</button>
            <button onClick="location.href = '/googleauth1.html';" class="login-button">Login</button>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default Topbar;