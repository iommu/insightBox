import React from 'react';
import { User, Day } from './components/Queries';
import { withRouter } from 'react-router-dom';
import Graph1 from './components/Graph1';

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
        <div>
          <div class="dashboard-content">
            <div class="stat-container">
              <User />
            </div>
            <div class="stat-container">
              <Day />
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              <Graph1 />
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
            <div class="stat-container">
              Graph
            </div>
  
          </div>
        </div>
      </Provider>
    );
  };
}

export default withRouter(Dashboard);