import React from "react";
import "../styles/App.css";

export default () => (
    <div>
        <div className="homepage-content-pptos">
            <h1>Privacy Policy</h1>
            <p>Last modified: 6 September 2020</p>
            <p>
                Our email analytics service at <b>insightbox.xyz</b> is
                committed to the privacy and security of the information that we
                collect, process, analyse and store from our users when using
                our application. This policy outlines what data we collect from
                our users, how we use it and the current security of the site.
            </p>
            <p>
                We may change this policy over time, ensure to check back every
                now and again.
            </p>
            <h2>What data we collect</h2>
            <p>
                We collect a user's Google account information to sign up and
                create an account on the system for the user.
            </p>
            <p>
                When processing and displaying insights and analytics on a
                user's Gmail inbox, we retrieve email metadata such as:{" "}
            </p>
            <ul>
                <li>Subject Title</li>
                <li>Time sent/received</li>
                <li>Recipient information</li>
                <li>Sender information</li>
            </ul>
            <h2>How we collect this data</h2>
            <p>
                When a user signs up with their Google account, we use Google's
                API to retrieve their data securely using the OAuth 2.0
                protocol. Authorised requests are then sent to the user's Gmail
                account to retrieve email metadata of the user's inbox.
            </p>
            <p>
                Google’s API Terms may be accessed at:{" "}
                <a href="https://developers.google.com/terms/">
                    https://developers.google.com/terms/.
                </a>
            </p>
            <h2>How we use this data</h2>
            <p>
                We use the data we collect to provide analytics and insights for
                our users and nothing more.
            </p>
            <h2>Disclosure of information</h2>
            <p>
                We do not disclose your information to any external third
                parties.
            </p>
            <h2>Security</h2>
            <p>
                This website is still under development so we can't currently
                guarantee the confidentiality of the information that you
                provide.
            </p>
            <h2>Contact</h2>
            <p>insightbox.analytics@gmail.com</p>
            <br />
        </div>
    </div>
);
