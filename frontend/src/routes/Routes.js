import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import all page components here
import App from '../components/app/App';
import HomePage from '../components/homepage/homepage';
import AboutPage from '../components/homepage/about';
import PrivacyPolicyPage from '../components/homepage/privacypolicy';
import TermsOfUsePage from '../components/homepage/termsofuse';
import Dashboard from '../components/dashboard/dashboard';


// all routes go here
const Routes = () => {
    return (
        <Switch>
            <Route exact path="/about" component={AboutPage}></Route>
            <Route exact path="/privacypolicy" component={PrivacyPolicyPage}></Route>
            <Route exact path="/termsofuse" component={TermsOfUsePage}></Route>
            <Route exact path="/" component={HomePage}></Route>
        </Switch>
    );
}

export default Routes;
