import React from "react";
import "../styles/App.css";
import {TerminalController} from './components/Terminal';

export default () => (
    <div>
        <div class="homepage-content">
            <br/>
            <br/>
            <p>
                <b>insightBox</b> is an email analytics service that connects to
                a Gmail account and provides insights and statistics. The main
                aim of the service is to provide users with information so that
                they can take action upon the insights provided, and better
                streamline their email habits so as to improve work and
                scheduling habits.
            </p>
            <br />
            <h2>End-to-end Post-Quantum Security</h2>
            <p>
                short description
            </p>
            <br/>
            <p>
                This is what our database looks like:
            </p>
            <TerminalController/>
        </div>
    </div>
);
