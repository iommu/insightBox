import React from "react";
import "../styles/App.css";
import {TerminalController, TopScroll} from './components/Terminal';

export default () => {

    document.querySelector('body').scrollTo(0,0);

return(
    <div>
        
        <div class="homepage-content-about">
            <div class="homepage-content-about-text">
            <br/>
            <br/>
            <p>
                insightBox is an email analytics service that connects to
                a Gmail account and provides insights and statistics. The main
                aim of the service is to provide users with information so that
                they can take action upon the insights provided, and better
                streamline their email habits to improve work and
                scheduling habits.
            </p>
            <br />
            <h2>End-to-end Post-Quantum Security</h2>
            <p>
                insightBox provides end-to-end encryption between our server and the end-user's device using CRYSTALS-KYBER and AES-256.
            </p>
            <br/>
            <p>
                This is what our database looks like:
            </p>
            </div>
            <div id="terminal-center">
            <TerminalController/>
            </div>
            <TopScroll/>
        </div>
    </div>
);

}
