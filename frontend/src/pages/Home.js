/** @jsx jsx */
import { jsx } from "theme-ui";

import logo from "../images/logo.png";
import "../styles/App.css";
import { GoogleBtn } from "./components/GoogleBtn";

import {
    Graph1Home,
    Graph2Home,
    Graph3Home,
    Graph4Home,
    Graph5Home,
    Graph6Home,
} from "./components/GraphsHome";

export default (props) => (
    <div>
        <div id="home-icon">
            <img id="logo-img" src={logo} alt="insightBox" />
        </div>
        <div id="title-main">
            <div id="title1">insightBox</div>
            <div id="title2">insights on your inbox</div>
            <div id="connect">
                <GoogleBtn />
            </div>
        </div>

        <div className="homepage-slide" style={{ color: "#000" }}>
            <div id="home-graph1">
                <Graph1Home />
            </div>

            <div id="home-graph2">
                <Graph2Home />
            </div>

            <div id="home-graph3">
                <Graph3Home />
            </div>

            <div id="home-graph4">
                <Graph4Home />
            </div>

            <div id="home-graph5">
                <Graph5Home />
            </div>

            <div id="home-graph6">
                <Graph6Home />
            </div>
        </div>

        <div className="footer" sx={{ color: "muted" }}>
            Graphs from <a href="https://recharts.org/en-US">Recharts</a>
        </div>
    </div>
);
