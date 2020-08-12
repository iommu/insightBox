import React from 'react';
import '../styles/App.css';

function PrivacyPolicy() {
  return (
    <div>
        <div class="homepage-content">
        <h1>Privacy Policy</h1>
        <p>Last modified: 26 July 2020</p>
        <p>Our email analytics service at <b>insightbox.xyz</b> is committed to the privacy and security of the information that we collect, process, analyse and store from our users when using our application. This policy outlines what information we collect, how our users can manage this information on our system and their rights and responsibilities.</p>
        <p>We may change this policy over time and if so, we will notify our users via email of these changes.</p>
        <h2>What data we collect</h2>
        <p>We collect a user's Google account information to sign up and create an account on the system for the user.</p>
        <p>When processing and displaying insights and analytics on a user's Gmail inbox, we retrieve email metadata such as:
        <ul>
            <li>Subject Title</li>
            <li>Time sent/received</li>
            <li>Recipient information</li>
            <li>Sender information</li>
        </ul>
        </p>
        <h2>How we collect this data</h2>
        <p>When a user signs up with their Google account, we use Google's API to retrieve their data securely using the OAuth 2.0 protocol. Authorised requests are then sent to the user's Gmail account to retrieve email metadata of the user's inbox.</p>
        <p>Google’s API Terms may be accessed at: <a href="https://developers.google.com/terms/">https://developers.google.com/terms/.</a></p>
        <h2>How we use this data</h2>
        <p>We use the data we collect to provide analytics and insights for our users and nothing more.</p>
        <p>Under the European Union's General Data Protection Regulation, the data of the users we hold maintain their:
        <ul>
            <li>Right of access</li>
            <li>Right to recertification</li>
            <li>Right to erasure</li>
            <li>Right to restrict processing</li>
            <li>Right to data protability</li>
        </ul>
        </p>
        <p>The General Data Protection Regulation may be accessed here: <a href="https://gdpr-info.eu/">https://gdpr-info.eu/</a>.</p>
        <h2>Disclosure of information</h2>
        <p>We do not disclose your information to any external third parties.</p>
        <h2>Security</h2>
        <p>The data collected and stored from our users are encrypted and aren't exposed to the developers or any other authorised parties within the system.</p>
        <h2>Minors</h2>
        <p>Our site is not intended for use by people under the age of 18.</p>
        <h2>Contact</h2>
        <p>To contact us about any privacy concerns or issues, email us at:<br/>insightbox.analytics@gmail.com</p>
        <br/>
        </div>
    </div>
  );
}

export default PrivacyPolicy;
