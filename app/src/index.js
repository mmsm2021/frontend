import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-pro-sidebar/dist/css/styles.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navigation from "./Navigation";
import {IntlProvider} from 'react-intl';
import translations from "./configuration/translations";
import {Sidebar} from "./Sidebar";
import {AppDT} from "./orders/datatable";
const NavDisplay = () =>{


}
ReactDOM.render(
    <Auth0Provider
        domain="mmsm.eu.auth0.com"
        clientId="BxBvrTebzNYd8aQTzIjaKiI7VmYtNQp3"
        redirectUri={window.location.origin}
        audience="https://mmsm.eu.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata read:branding read:organizations read:users"
        organization="org_Wapaaiqxzjl75Uvd"
    >

        <Router>
            <IntlProvider locale={'en'} messages={translations['en']}>
                {/*<Navigation/>*/}
                    <Route path="/" component={App}/>
            </IntlProvider>
        </Router>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
