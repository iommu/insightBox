import React from "react";
import { withRouter } from "react-router-dom";
import {
    Graph1,
    Graph2,
    Graph3,
    Graph4,
    Graph5,
    Graph6,
    Graph7,
    Graph8,
    Graph9,
} from "./components/Graphs";

import { WordCloud } from "./components/WordCloud";
import SideBar from "./components/SideBar";
import { GraphTest2 } from "./components/GraphTest2";
import { GraphTest3 } from "./components/GraphTest3";
import moment from "moment";
import { Cipher } from "./Cipher";
// import react-grid-layout
import { Responsive, WidthProvider } from "react-grid-layout";
import "../styles/react-grid-layout/grid-styles.css";
import "../styles/react-grid-layout/resizeble-styles.css";
const ResponsiveGridLayout = WidthProvider(Responsive);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("token")) {
            console.log("error: no login token, redirecting");
            this.props.history.push("/");
        }

        this.state = {
            startDate: moment().subtract(7, "day"), // sets default dashboard dates to be current date subtract 7 days
            endDate: moment().subtract(0, "day"),
            currentBreakPoint: "lg",
            compactType: "horizontal",
        };

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint,
        });
    }

    updateDates = (startDate, endDate) => {
        this.setState({
            startDate: startDate,
            endDate: endDate,
        });
    };

    render() {
        return (
            <div id="dash-container">
                <Cipher />
                <SideBar updateDates={this.updateDates} />
                <div
                    className="dashboard-content"
                    style={{
                        marginLeft: "340px",
                        color: "#333",
                        height: "auto",
                    }}
                >
                    <div id="dash-graph1">
                        <Graph1 />
                    </div>

                    <div id="dash-graph2">
                        <Graph2 />
                    </div>

                    <div id="dash-graph3">
                        <Graph9 />
                    </div>

                    <div id="dash-graph4">
                        <Graph4 />
                    </div>

                    <div id="dash-graph5">
                        <Graph5 />
                    </div>

                    <div id="dash-graph6">
                        <Graph7 />
                    </div>
                    <div id="dash-graph8">
                        <WordCloud
                            sDate={this.state.startDate.toISOString()}
                            eDate={this.state.endDate.toISOString()}
                        />
                    </div>
                    <div id="dash-graph9">
                        <Graph8 />
                    </div>
                    <div id="dash-graph10">
                        <Graph3 />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
