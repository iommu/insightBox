import React from "react";
import { withRouter } from "react-router-dom";
import { Graph1 } from "./components/Graph1";
import { Graph2 } from "./components/Graph2";
import { Graph3 } from "./components/Graph3";
import { Graph4 } from "./components/Graph4";
import { Graph5 } from "./components/Graph5";
import { Graph6 } from "./components/Graph6";
import { Graph7 } from "./components/Graph7";
import { Graph8 } from "./components/Graph8";
import { Graph9 } from "./components/Graph9";
import { Graph10 } from "./components/Graph10";
import { WordCloud } from "./components/WordCloud";
import SideBar from "./components/SideBar";
import { GraphTest2 } from "./components/GraphTest2";
import { GraphTest3 } from "./components/GraphTest3";
import moment from "moment";
import { Cipher } from "./Cipher";

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
        };
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
                    style={{ marginLeft: "300px", color:"#333" }}
                >
                    <div className="stat-container">
                        <Graph1 />
                    </div>
                    <div className="stat-container">
                        <Graph2 />
                    </div>
                    <div className="stat-container">
                        <Graph3 />
                    </div>
                    <div className="stat-container">
                        <Graph4 />
                    </div>
                    <div className="stat-container">
                        <Graph5 />
                    </div>
                    <div className="stat-container">
                        <WordCloud />
                    </div>
                    <div className="stat-container">
                        <Graph6 />
                    </div>
                    <div className="stat-container">
                        <Graph7 />
                    </div>
                    <div className="stat-container">
                        <Graph8 />
                    </div>
                    <div className="stat-container">
                        <GraphTest2
                            sDate={this.state.startDate.toISOString()}
                            eDate={this.state.endDate.toISOString()}
                        />
                    </div>
                    <div className="stat-container">
                        <GraphTest3
                            sDate={this.state.startDate.toISOString()}
                            eDate={this.state.endDate.toISOString()}
                        />
                    </div>
                    <div className="stat-container">
                        <Graph9
                            sDate={this.state.startDate.toISOString()}
                            eDate={this.state.endDate.toISOString()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);
