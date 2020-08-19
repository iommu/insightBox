import React from 'react';
import { User, Day } from './components/Queries';

// import graphql and create client
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://insightbox.xyz/api',
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
          <Day/>
        </div>
      </div>
    </Provider>
  );
}

export default Dashboard;