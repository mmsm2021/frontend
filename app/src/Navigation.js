import {useAuth0} from "@auth0/auth0-react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Nav, NavDropdown, Container, Image} from "react-bootstrap";
import Logo from "./fd_logo.svg";
import ComponentList from "./ComponentList";



function UserAvatar(props){
    return(
        <Image src={props.user.picture}
               alt={props.user.name}
                roundedCircle />
    )
}


const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated){
        return <LoginButton/>
    }

    return (
        isAuthenticated && (
            <Nav>
            <NavDropdown title={user.name} id="collapsible-nav-dropdown">
                <NavDropdown.ItemText>
                <UserAvatar user={user} />
                </NavDropdown.ItemText>
                <NavDropdown.Item href="#action/3.1">
                    Min profil
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Historik</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Indstillinger</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" >
                    <LogoutButton/>
                </NavDropdown.Item>
            </NavDropdown>
            </Nav>
        )
    );
};
const LoginButton = () =>{
    const { loginWithRedirect } = useAuth0();

    return <Nav.Item>
            <Button onClick={() => loginWithRedirect()}>Login</Button>
            </Nav.Item>
}
const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Nav.Item>
            <Button variant="danger" size="sm" onClick={() => logout({ returnTo: window.location.origin })} block>
            Log ud
            </Button>
        </Nav.Item>
    );
};

class Navigation extends React.Component{

    render() {
        return(
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                <Navbar.Brand href="#home">
                    <img src={Logo}
                            width="126"
                            height="48"
                            className="d-inline-block align-top"
                            alt="Company Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <ComponentList />
                    </Nav>
                    <Profile />
                </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
export default Navigation;
