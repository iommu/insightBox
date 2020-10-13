import React from "react";
import "../styles/App.css";

export default () => (
  <div>
    <div class="aboutpage-content">
      <h1>About</h1>
      <p>
        <b>insightBox</b> is an email analytics service that connects to a Gmail
        account and provides insights and statistics. The main aim of the
        service is to provide users with information so that they can take
        action upon the insights provided, and better streamline their email
        habits so as to improve work and scheduling habits.
      </p>
      <p>work in progress</p>
      <br />
      <h2>Statistics and Features</h2>
      <p>
        With <b>insightBox</b>, users will be able to access the times that they
        sent and receive emails and the days in which they do so. The user will
        also be able to access key words and topics that they send/receive in
        their inboxes.
      </p>
      <p>
        Another statistic that <b>insightBox</b> can retrieve, are the contacts
        and which contact is your most popular contact. With these statistics,{" "}
        <b>insightBox</b> will make an insight to help improve your work ethic.
      </p>
      <br />
      <h2>Examples</h2>
      <p>
        If a user is sending less emails in response to emails received on a
        Wednesday, then the insight is made to allow extra time for emails on
        that day so as to not increase your workload for the following day.
      </p>
      <p>
        In the case that you have been receiving and sending correspondence
        about a particular topic, <b>insightBox</b> relays this information in a
        graphical format, informing the user on the topic that the user has been
        discussing most lately.
      </p>
      <br />
    </div>
  </div>
);
