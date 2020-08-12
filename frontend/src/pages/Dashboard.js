import React from 'react';
import { User } from './components/Queries';

// import graphql and create client
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://insightbox.xyz:4000/api',
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
        <div class="homepage-content">
          <User/>
        </div>
      </div>
    </Provider>
  );
}

export default Dashboard;