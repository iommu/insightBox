import React from 'react';
import './styles/App.css';

// import modules
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { createClient, Provider } from 'urql';
import { ThemeProvider } from 'theme-ui';
import theme from './styles/theme';

// import all components
import NavBar from './pages/components/NavBar'

// import all pages
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsofUse';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';

const client = createClient({
  url: 'https://insightbox.xyz/api',
  fetchOptions: () => {
    const token = localStorage.getItem("token");
    return {
      headers: { authorization: token ? token : "" },
    };
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Provider value={client}>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route path="/about"><About /></Route>
              <Route path="/privacypolicy"><PrivacyPolicy /></Route>
              <Route path="/termsofuse"><TermsOfUse /></Route>
              <Route path="/termsofuse"><TermsOfUse /></Route>
              <Route path="/dashboard"><Dashboard /></Route>
              <Route path="/settings"><Settings /></Route>
              <Route path="/signin" component={SignIn}></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
