import React from 'react';
import { User, Day } from './components/Queries';
import { withRouter } from 'react-router-dom';

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
            <Flex flexWrap='wrap' m={20} >
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 1, 47.5/100 ]}
                m={3}
                p={3}>
                Reflex
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 1, 47.5/100 ]}
                m={3}
                p={3}>
                Box
              </Box>
  
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 2, 31/100 ]}
                m={3}
                p={3}>
                Reflex
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 2, 31/100 ]}
                m={3}
                p={3}>
                Box
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 2, 31/100 ]}
                m={3}
                p={3}>
                Box
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 1, 47/100 ]}
                m={3}
                p={3}>
                Reflex
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 1, 47/100 ]}
                m={3}
                p={3}>
                Box
              </Box>
  
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 2, 31/100 ]}
                m={3}
                p={3}>
                Reflex
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 2, 31/100 ]}
                m={3}
                p={3}>
                Box
              </Box>
              <Box 
                sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}
                width={[ 2, 31/100 ]}
                m={3}
                p={3}>
                Box
              </Box>
  
  
              <Box width={4/10} m={10} px={2} py={2} sx={{textAlign: 'center', borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                Graph
                </Text>
              </Box>
              <Box width={4/10} m={10} px={2} py={2} sx={{textAlign: 'center',borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                <User />
                </Text>
              </Box>
              <Box width={1/3} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                <Day />
                </Text>
              </Box>
  
              <Box width={1/3} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                Graph
                </Text>
              </Box>
              <Box width={1/3} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                <User />
                </Text>
              </Box>
              <Box width={1/4} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                <Day />
                </Text>
              </Box>
              <Box width={1/4} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                Data
                </Text>
              </Box>
              <Box width={1/4} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                Data
                </Text>
              </Box>
              <Box width={1/4} px={2} py={2} sx={{borderWidth: '1px',borderStyle: 'solid',borderColor: 'black', backgroundColor: 'white'}}>
                <Text p={1} color='black' bg='primary'>
                Data
                </Text>
              </Box>
            </Flex>
          </div>
        </div>
      </Provider>
    );
  };
}

export default withRouter(Dashboard);
