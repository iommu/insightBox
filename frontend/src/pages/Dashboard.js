import React from 'react';
import { User, Day } from './components/Queries';
import logo from '../images/logo.png';
import graph1 from '../images/graph1.png';
import graph2 from '../images/graph2.png';
import '../styles/App.css';

// import graphql and create client
import { createClient, Provider } from 'urql';

import {
  Flex, Button, Box, Text
} from 'rebass';

const client = createClient({
  url: 'https://insightbox.xyz/api',
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? token : "" },
    };
  },
});

function Dashboard() {
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
          <div class="stat-container">
            Graph
          </div>

        </div>
      </div>
    </Provider>
  );
}

export default Dashboard;
