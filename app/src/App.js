import React from "react";

import {Container, Row} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import {Route, Switch} from "react-router-dom";
import Orders from "./orders/Orders";
import {Test} from "./Test";
import {FormattedMessage} from "react-intl";
import {Profile} from "./profile/Profile";

function App() {
    const {user, isAuthenticated, getIdTokenClaims} = useAuth0();
    return (
        <Container fluid>
            <Row>
                <Switch>
                    <Route path="/orders">
                        <Orders/>
                    </Route>
                    <Route path="/test">
                        <Test/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route exact path="/">
                        <h2><FormattedMessage id="welcome"/></h2>
                    </Route>

                </Switch>

            </Row>
        </Container>

    );
}

export default App;
