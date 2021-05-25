import React from "react";
import {NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

class ComponentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comps: Array
        }
    }

    fillDummys(a) {
        let dummys = [];
        for (let i = 0; i <= a; i++) {
            dummys.push(
                <NavDropdown.Item href={"#action/" + i}>Handling #{i}</NavDropdown.Item>
            );
        }

        return dummys;
    }

    render() {
        return (

            <NavDropdown title="Handlinger" id="collapsible-nav-dropdown">
                {this.fillDummys(5)}
            </NavDropdown>

        )
    }
}

export default ComponentList;
