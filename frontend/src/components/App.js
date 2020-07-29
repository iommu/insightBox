import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

// MPA switching
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from './Landing';
import PrivPol from './PrivPol';
import TermSer from './TermSer';
import Dashboard from './Dashboard';

// React components
import {
  Provider,
  Button,
  Heading
} from 'rebass';
import NavBar from './NavBar';

// Theming
import { ThemeProvider } from 'emotion-theming'
import Theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/privacypolicy">
              <PrivPol/>
            </Route>
            <Route path="/termsofservice">
              <TermSer/>
            </Route>
            <Route path="/">
              <Landing/>
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
