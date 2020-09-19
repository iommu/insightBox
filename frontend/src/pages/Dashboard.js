import React from 'react';
import { User, Day } from './components/Queries';
import { withRouter } from 'react-router-dom';
import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';

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
        <div>
          <div className="dashboard-content">
            <div className="stat-container">
              <Graph2 />
            </div>
            <div className="stat-container">
              <Day />
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              <Graph1 />
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
            <div className="stat-container">
              Graph
            </div>
  
          </div>
        </div>
    );
  };
}

export default withRouter(Dashboard);