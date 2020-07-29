import React from 'react';
import {
  Box,
  Flex,
  Button,
} from 'rebass';
import {
  Link
} from "react-router-dom";

const Landing = () => (
  <Box sx={{
    color: 'text',
    bg: 'background',
  }}>
    <Box
      sx={{
        // '*': { outline: '1px solid rgba(0, 255, 255, 0.5)', },
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'wide',
        minHeight: 'calc(100vh - 55px)',
        mx: 'auto',
        px: 4,
        py: [4, 5],
        h1: {
          variant: 'text.caps',
          fontSize: 3,
        },
        pre: {
          p: 0,
          mb: 0,
          bg: 'transparent',
        }
      }}>
      <h2>insightBox</h2>
      <p>Your box for insight or something idk</p>
      <Box my='auto' />
      <Flex px={0} color="white" alignItems="center">
        <Box m="auto">
          <Link to="/dashboard">
            <Button renderAs="button" backgroundColor="#4285F4" m="auto" p={2} px={4}>Sign in with Google</Button>
          </Link>
        </Box>
        <Link to="/termsofservice">
          <Button renderAs="button" backgroundColor="secondary" ml="auto" p={2}>Terms of Service</Button>
        </Link>
        <Link to="/privacypolicy">
          <Button renderAs="button" backgroundColor="secondary" mx={3} p={2}>Privacy Policy</Button>
        </Link>
      </Flex>
    </Box>
  </Box>
);

export default Landing;