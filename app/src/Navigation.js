import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import Logo from "./fd_logo.svg";
import {NavLink} from "react-router-dom";


function UserAvatar(props) {
    return (
        <Image src={props.user.picture}
               alt={props.user.name}
               roundedCircle/>
    )
}


export const AuthAction = () => {
    const {user, isAuthenticated, getIdTokenClaims} = useAuth0();

    if (!isAuthenticated) {
        return <LoginButton/>
    } else {
        getIdTokenClaims()
            .then(res => localStorage.setItem("bearer", res.__raw))
            .catch(err => console.log(err.message));
        console.log(localStorage.getItem("bearer"));
        return <LogoutButton/>
    }
};
const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();

    return <Nav.Item>
        <Button onClick={() => loginWithRedirect()}>Login</Button>
    </Nav.Item>
}
const LogoutButton = () => {
    const {logout} = useAuth0();
    return (
        <Nav.Item>
            <Button variant="danger" size="sm" onClick={() => logout({returnTo: window.location.origin})} block>
                Log ud
            </Button>
        </Nav.Item>
    );
};

class Navigation extends React.Component {

    render() {
        return (
            <>
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={Logo}
                             width="126"
                             height="48"
                             className="d-inline-block align-top"
                             alt="Company Logo"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item className={"nav-link"}>

                                <NavLink to="/">Home</NavLink>
                            </Nav.Item>
                            <Nav.Item className={"nav-link"}>
                                <NavLink to="/test">Test</NavLink>
                            </Nav.Item>
                        </Nav>
                        <AuthAction/>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            </>
        )
    }
}

export default Navigation;
