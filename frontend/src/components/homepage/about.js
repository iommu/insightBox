import React from 'react';
import logo from '../../images/logo.png';
import '../app/App.css';
import Topbar from './topbar';

function AboutPage() {
  return (
    <div>
        <Topbar />
        <div class="homepage-content">
        <h1>About</h1>
        <p><b>insightBox</b> is an email analytics service that connects to a Gmail account and provides insights and statistics.</p>
        <p>Describe features...</p>
        </div>
    </div>
  );
}

export default AboutPage;
