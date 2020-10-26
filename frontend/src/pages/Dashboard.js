import React from "react";
import { withRouter } from "react-router-dom";
import info from "../images/info.png";
import { Graph1 } from "./components/Graph1";
import { Graph2 } from "./components/Graph2";
import { Graph3 } from "./components/Graph3";
import { Graph4 } from "./components/Graph4";
import { Graph5 } from "./components/Graph5";
import { Graph6 } from "./components/Graph6";
import { Graph7 } from "./components/Graph7";
import { Graph8 } from "./components/Graph8";
import SideBar from "./components/SideBar";
import { Graphtest } from "./components/Graphtest";
import { GenerateKEM } from "./components/Crypto";
import { GraphTest2 } from "./components/GraphTest2";
import moment from "moment";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("token")) {
      console.log("error: no login token, redirecting");
      this.props.history.push("/");
    }
    this.state = {
      startDate: moment().subtract(7, "day"),             //sets default dashboard dates to be current date subtract 7 days
      endDate: moment().subtract(0, "day"),
      
    };

    // GenerateKEM();
    window.location.reload();

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
        <p>
          Date range is from ${this.state.startDate.toISOString()} to $
          {this.state.endDate.toISOString()}
        </p>
        <SideBar updateDates={this.updateDates} />
        <div className="dashboard-content" style={{ marginLeft: "300px" }}>
          <div className="stat-container">
            <Graph1 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph2 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph3 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph4 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph5 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph6 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph7 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <Graph8 />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
          <div className="stat-container">
            <GraphTest2 sDate={this.state.startDate.toISOString()} eDate={this.state.endDate.toISOString()} />
            <div className="info">
              <img className="info-img" src={info} alt="info" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
