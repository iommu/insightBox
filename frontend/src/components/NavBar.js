import React from 'react';
import { 
  Flex, 
  Button, 
  Text,
  Box
} from 'rebass';
import {  
  Link,
  Route,
  Switch
} from "react-router-dom";

const NavBar = () => (
  <Flex px={0} color="white" bg="black" alignItems="center">
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Text color="white" p={2} fontWeight="bold">
        insightBox
      </Text>
    </Link>
    <Box my="2" ml="auto">
      <Switch>
        <Route path="/dashboard">
          <Link to="/">
            <Button renderAs="button" bg="red" p={2}>Logout</Button>
          </Link>
        </Route>
        <Route path="/">
          <Link to="/dashboard">
            <Button renderAs="button" variant="primary" p={2}>Signup</Button>
          </Link>
          <Link to="/dashboard">
            <Button renderAs="button" variant="secondary" mx="2" p={2}>Login</Button>
          </Link>
        </Route>
      </Switch>
    </Box>
  </Flex>
);

export default NavBar;
