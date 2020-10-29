/** @jsx jsx */
import { jsx } from "theme-ui";

import logo from "../images/logo.png";
import "../styles/App.css";
import GoogleBtn from "./components/GoogleBtn";

import { Graph1Home } from "./components/Graph1Home";
import { Graph2Home } from "./components/Graph2Home";
import { Graph4Home } from "./components/Graph4Home";
import { Graph5Home } from "./components/Graph5Home";
import { Graph6Home } from "./components/Graph6Home";
import { Graph7Home } from "./components/Graph7Home";

export default (props) => (
  <div>
    <div id="home-icon">
      <img id="logo-img" src={logo} alt="insightBox" />
    </div>
    <div id="title-main">
      <div id="title1">insightBox</div>
      <div id="title2">analytics</div>
      <div id="connect">
        <GoogleBtn />
      </div>
    </div>

    <div className="homepage-slide">
      <div id="home-graph1">
        <Graph2Home />
      </div>

      <div id="home-graph2">
        <Graph1Home />
      </div>

      <div id="home-graph3">
        <Graph4Home />
      </div>

      <div id="home-graph4">
        <Graph7Home />
      </div>

      <div id="home-graph5">
        <Graph5Home />
      </div>

      <div id="home-graph7">
        <Graph6Home />
      </div>
    </div>

    <div className="footer" sx={{ color: "muted" }}>
      Graphs from <a href="https://recharts.org/en-US">Recharts</a>
    </div>
  </div>
);
