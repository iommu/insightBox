import React from 'react';
import logo from './images/logo.png';
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Topbar />
        <Switch>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/privacypolicy" component={PrivacyPolicy}></Route>
          <Route exact path="/termsofuse" component={TermsOfUse}></Route>
          <Route exact path="/termsofuse" component={TermsOfUse}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
