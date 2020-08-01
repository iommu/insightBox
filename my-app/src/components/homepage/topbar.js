import React from 'react';
import logo from '../../images/logo.png';
import '../app/App.css';
import { Link } from "react-router-dom";

export default class Topbar extends React.Component{
    render(){
        return (
        <div className="topbar">
            <img src={logo} alt="insightBox" width="75"/>
            <span id="logo-title"><b>insightBox</b></span>
            
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
        </div>
        );
    }
}
