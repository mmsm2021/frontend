import './App.css';
import React from "react";
import Navigation from "./Navigation";
import {Container,Row, Col} from "react-bootstrap";

function App() {

    return (
        <Container fluid>
            {/* Header row */}
            <Row>
                <Col>
                    <Navigation />
                    {/*<ComponentList />*/}
                </Col>
            </Row>
            {/*components and content row */}

            <Row>
                <Col className="App-components">
                    {/* Component items */}
                    Component items

                </Col>
                <Col xs={10}>
                    {/*Main content*/}
                    <div id="app-main-content">

                    </div>
                </Col>
            </Row>
        </Container>
  );
}

export default App;
