import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-pro-sidebar/dist/css/styles.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navigation from "./Navigation";
import About from "./About";

ReactDOM.render(
    <Auth0Provider
        domain="mmsm.eu.auth0.com"
        clientId="BxBvrTebzNYd8aQTzIjaKiI7VmYtNQp3"
        redirectUri={window.location.origin}
        organization="org_38UUgEiPSzeT9JI1" >
        <Router>
            <Navigation/>
            <Route path="/" component={App}/>
            <Route path="/about" component={About}/>
        </Router>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
