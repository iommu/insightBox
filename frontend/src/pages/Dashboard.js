import React from 'react';
import { User, Day } from './components/Queries';

// import graphql and create client
import { createClient, Provider } from 'urql';

import {
  Flex, Button, Box, Text
} from 'rebass';

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
          <Flex mx={-2}>
            <Box width={1 / 2} px={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black'}}>
              <Text p={1} color='black' bg='primary'>
              <User />
              </Text>
            </Box>
            <Box width={1 / 2} px={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black'}}>
              <Text p={1} color='black' bg='primary'>
              <Day />
              </Text>
            </Box>
          </Flex>
        </div>
      </div>
    </Provider>
  );
}

export default Dashboard;