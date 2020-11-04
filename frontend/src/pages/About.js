import React from "react";
import "../styles/App.css";
import { TerminalController } from "./components/Terminal";

export default () => {
    return (
        <div class="homepage-content-about">
            <div class="homepage-content-about-text">
                <br />
                <br />
                <h1>About</h1>
                <p>
                    <b>insightBox</b> is a web application that displays
                    statistics and insights based on a user's Gmail account. It
                    is aimed at working professionals who use email with the
                    purpose to increase productivity and optimise their time
                    spent in inbox.
                </p>
                <p>
                    The application gets user data by using the OAuth 2.0
                    protocol along with the Google API.
                </p>
                <br />
                <p>
                    Email metadata is downloaded and processed by the server to
                    generate analytics. Metadata includes:
                    <div id="ul-about">
                        <ul>
                            <li>Subject title</li>
                            <li>Date/time</li>
                            <li>Sender information</li>
                            <li>Recipient information</li>
                        </ul>
                    </div>
                </p>
                <br />
                <h2>End-to-End Post-Quantum Security</h2>
                <p>
                    Privacy is important so sensitive data like subject title
                    and sender/recipient information are encrypted. insightBox
                    uses quantum-resistant, end-to-end encryption to send
                    sensitive data from the server to the user using
                    CRYSTALS-KYBER and AES-256.
                </p>
                <br />
                <p>This is what our database looks like:</p>
            </div>
            <div id="terminal-center">
                <TerminalController />
            </div>
        </div>
    );
};
