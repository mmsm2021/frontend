import React, {useContext, useState} from "react";
import {Sidebar} from "./Sidebar";
import {Main} from "./Main";
import {Button, Container} from "react-bootstrap";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {IntlProvider} from "react-intl";
import translations from "./configuration/translations";
import {Switch} from "@material-ui/core";
import QuickActions from "./configuration/QuickActions";
import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme, GlobalStyles} from "./configuration/GlobalContext";
import {Context} from "./configuration/Store";
export let ManagementVar= {
    path: '/organizations',
    id: "",
    name: "",
    display_name: "",
    branding: {
        logo: "",
        colors: {}
    },
    metadata: ""
};
function App() {
    const [toggled, setToggled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [state, dispatch] = useContext(Context);
    const {user, isAuthenticated} = useAuth0();
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };
    const handleCollapsed = (value) =>{
        setCollapsed(value);
    }
    if (isAuthenticated){
        dispatch({type:'SET_USER', payload: user});
    }
    return (
        <ThemeProvider theme={state.theme === 'light' ? lightTheme:darkTheme}>

                <Auth0Provider
                    domain="mmsm.eu.auth0.com"
                    clientId="BxBvrTebzNYd8aQTzIjaKiI7VmYtNQp3"
                    redirectUri={window.location.origin}
                    audience="https://mmsm.eu.auth0.com/api/v2/"
                    scope="read:current_user update:current_user_metadata read:branding read:organizations read:users">
                    <React.StrictMode>
                        <Router>
                            <IntlProvider locale={state.locale} messages={translations[state.locale]}>
                                <GlobalStyles/>
                                {/*<Navigation/>*/}
                                {/*<Route path="/" component={App}/>*/}

                                <div className={`shadow-lg app`}>
                                <Sidebar
                                    handleCollapsed={handleCollapsed}
                                    collapsed={collapsed}
                                    handleToggleSidebar={handleToggleSidebar}
                                    toggled={toggled}
                                />

                                <Main handleToggleSidebar={handleToggleSidebar}
                                      toggled ={toggled} />

                                </div>

                            </IntlProvider>
                        </Router>
                    </React.StrictMode>
                </Auth0Provider>
        </ThemeProvider>


    );
}

export default App;
