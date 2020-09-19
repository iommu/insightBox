import React from 'react';
import { withRouter } from 'react-router-dom';
import info from '../images/info.png';
import { Graph1 } from './components/Graph1';
import { Graph2 } from './components/Graph2';
import { Graph3 } from './components/Graph3';
import { Graph4 } from './components/Graph4';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("token")) {
      console.log("error: no login token, redirecting");
      this.props.history.push("/");
    }
  }

  render() {
    return (
        <div id="dash-container">
          <div className="dashboard-content">
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
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info"/>
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
            <div className="stat-container">
              Graph
              <div className="info">
                <img className="info-img" src={info} alt="info" />
              </div>
            </div>
          </div>
        </div>
    );
  };
}

export default withRouter(Dashboard);