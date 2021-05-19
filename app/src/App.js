
import React from "react";

import {Container,Row, Col} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Orders from "./orders/Orders";
import {Test} from "./Test";
function App() {
    const {user, isAuthenticated, getIdTokenClaims} = useAuth0();
    return (

        <Container fluid>
            {/* Header row */}
            <Row>
                <Col>

                    {/*<ComponentList />*/}
                </Col>
            </Row>
            {/*components and content row */}

            <Row>
                        <Switch>
                            <Route path="/orders">
                                <Orders/>
                            </Route>
                            <Route path="/test">
                                <Test/>
                            </Route>
                            <Route exact path="/">
                                <h2>Home</h2>
                            </Route>

                        </Switch>

            </Row>
        </Container>

  );
}

export default App;
