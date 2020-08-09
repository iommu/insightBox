import React from 'react';
import './styles/App.css';

// import components
import { 
  BrowserRouter, 
  Switch, 
  Route 
} from 'react-router-dom';
import Topbar from './pages/components/Topbar'

// import all pages
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsofUse';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Topbar />
        <Switch>
          <Route path="/about"><About/></Route>
          <Route path="/privacypolicy"><PrivacyPolicy/></Route>
          <Route path="/termsofuse"><TermsOfUse/></Route>
          <Route path="/termsofuse"><TermsOfUse/></Route>
          <Route path="/dashboard"><Dashboard/></Route>
          <Route exact path="/signin"><SignIn/></Route>
          <Route path="/"><Home/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
