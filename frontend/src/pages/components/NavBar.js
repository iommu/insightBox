import React from 'react';
import {
  Flex, Button, Box, Text
} from 'rebass';
import {
  Switch, Route, Link, withRouter
} from "react-router-dom";
import AuthButton from './Oauth';
import logo from '../../images/logo.png';

import { ID } from './Queries';

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

class TopBar extends React.Component {
  render() {
    return (
      <Flex
        px={2}
        py={2}
        color='black'
        bg='white'
        alignItems='center'
        sx={{borderBottom: '3px solid', borderImage: 'linear-gradient(to right, #9636ff 20%, #40a1f1 20%, #40a1f1 40%, #65AD50 40%, #65AD50 60%, #FFD151 60%, #FFD151 80%, #f13333 80%, #f13333 100%) 5'}}>
        <Link to="/">
          <Flex
            color='black'
            alignItems='center'>
            <img src={logo} alt="insightBox" width="75" />
            <Text fontWeight='bold'>insightBox</Text>
          </Flex>
        </Link>
        <Switch>
          <Route path="/signin"></Route>
          
          <Route path="/dashboard">
          <Provider value={client}>
            <Box mx='auto' />
            <ID/>
            </Provider>
          </Route>
          
          <Route path="/">
            <Box mx='auto' />
            <Box>
              <Link to="/" style={{ color: '#333' }}>Home</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to="/about" style={{ color: '#333' }}>About</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to="/privacypolicy" style={{ color: '#333' }}>Privacy Policy</Link>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to="/termsofuse" style={{ color: '#333' }}>Terms Of Use</Link>
            </Box>
            <Box mx='auto' />
            <AuthButton>
              <Button sx={{ backgroundColor: 'white', color: '#c54339', border: '1px solid #c54339' }}>Sign Up</Button>
            &nbsp;&nbsp;
            <Button sx={{ backgroundColor: '#c54339', color: 'white', border: '1px solid #c54339' }}>Login</Button>
            </AuthButton>
          </Route>
        </Switch>
      </Flex>
    )
  }
}

export default withRouter(TopBar);