import React from 'react';
import logo from '../../images/logo.png';
import graph1 from '../../images/graph1.png';
import graph2 from '../../images/graph2.png';
import '../app/App.css';
import Topbar from './topbar';
import GoogleBtn from './googlebtn';

function HomePage() {
  return (
  
    <div>
    
        <Topbar />
        
        <div id="home-icon">
             <img src={logo} alt="insightBox" width="260"/> 
        </div>
        
        <div id="title-main">
            <div id="title1">insightBox</div>
            <div id="title2">insights on your inbox</div>
        </div>
        
        <div id="connect">
            <button>Put Google Auth Here</button>
        </div>
        
        <div id="graph2">
            <img src={graph2} width="700"/>
        </div>
        
        <div id="graph1">
            <img src={graph1} width="650"/>
        </div>
        
    </div>
    
  );
}

export default HomePage;
