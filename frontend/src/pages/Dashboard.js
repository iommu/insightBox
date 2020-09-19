import React from 'react';
import { User, Day } from './components/Queries';
import { withRouter } from 'react-router-dom';
import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';

// import graphql and create client
import { createClient, Provider } from 'urql';


const client = createClient({
  url: 'https://insightbox.xyz/api',
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? token : "" },
    };
  },
});

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
      <Provider value={client}>
        <div id="dash-container">
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
      </Provider>
    );
  };
}

export default withRouter(Dashboard);