import React from 'react';
import logo from '../images/logo.png';
import graph1 from '../images/graph1.png';
import graph2 from '../images/graph2.png';
import '../styles/App.css';
import Topbar from './components/Topbar';
import GoogleBtn from './components/GoogleBtn';

function Home() {
  return (
    <div>
      <Topbar />
      <div id="home-icon">
        <img src={logo} alt="insightBox" width="260" />
      </div>
      <div id="title-main">
        <div id="title1">insightBox</div>
        <div id="title2">insights on your inbox</div>
      </div>
      <div id="connect">
        <GoogleBtn />
      </div>
      <div id="graph2">
        <img src={graph2} width="700" />
      </div>
      <div id="graph1">
        <img src={graph1} width="650" />
      </div>
    </div>
  );
}

export default Home;
