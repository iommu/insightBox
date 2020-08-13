import React from 'react';
import {
  Flex, Button, Box, Text
} from 'rebass';
import {
  Switch, Route, Link
} from "react-router-dom";
import AuthButton from './Oauth';
import { LogOut } from 'react-feather';
import logo from '../../images/logo.png';


function TopBar() {
  return (
    <Flex
      px={2}
      color='black'
      bg='white'
      alignItems='center'
      sx={{borderBottom: '1px solid #bbb', boxShadow: '0px 0px 4px 1px #bbb'}}>
      <img src={logo} alt="insightBox" width="75" />
      <Text fontWeight='bold'>insightBox</Text>
      <Switch>
        <Route path="/signin"></Route>
        <Route path="/dashboard">
          <Box mx='auto' />
          <button>
            <LogOut />
          </button>
        </Route>
        <Route path="/">
          <Box mx='auto'/>
          <Box>
            <Link to="/" style={{color: '#333'}}>Home</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/about" style={{color: '#333'}}>About</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/privacypolicy" style={{color: '#333'}}>Privacy Policy</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/termsofuse" style={{color: '#333'}}>Terms Of Use</Link>
          </Box>
          <Box mx='auto' />
          <AuthButton>
          <Button sx={{backgroundColor:'white', color:'#c54339', border: '1px solid #c54339'}}>Sign Up</Button>
          &nbsp;&nbsp;
          <Button sx={{backgroundColor:'#c54339', color: 'white', border: '1px solid #c54339'}}>Login</Button>
          </AuthButton>
        </Route>
      </Switch>
    </Flex>
  )
}

export default TopBar;