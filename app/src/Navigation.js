import {useAuth0} from "@auth0/auth0-react";
import React, {useContext} from "react";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import Logo from "./fd_logo.svg";
import {NavLink} from "react-router-dom";
import {Sidebar} from "./Sidebar";
import {JWTParser} from "./services/JWTParser";
import {Context} from "./configuration/Store";
import {setToken} from "./configuration/Token";


function UserAvatar(props) {
    return (
        <Image src={props.user.picture}
               alt={props.user.name}
               roundedCircle/>
    )
}


export const AuthAction = () => {
    const {user, isAuthenticated, getIdTokenClaims} = useAuth0();
    const [state,dispatch] = useContext(Context);
    if (!isAuthenticated) {
        return <LoginButton/>
    } else {
        getIdTokenClaims()
            .then(res => {
                if (state.user === null && user !== null) {
                    dispatch({type: 'SET_USER', payload: user});
                }
                if (res !== null && typeof res === 'object' && typeof res.__raw === 'string') {
                    dispatch({type: 'SET_TOKEN', payload: res.__raw});
                }
            }).catch(
                err => console.log(err.message)
            );
        return <LogoutButton/>
    }
};
const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();

    return <Button onClick={() => loginWithRedirect()} block>Login</Button>;

}
const LogoutButton = () => {
    const {logout} = useAuth0();
    return (
        <Nav.Item>
            <Button variant="danger" size="sm" onClick={() => {
                setToken(null);
                logout({returnTo: window.location.origin});
            }} block>
                Log ud
            </Button>
        </Nav.Item>
    );
};

class Navigation extends React.Component {

    render() {
        return (
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" sticky="top">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">

                            <Sidebar/>

                        <AuthAction/>
                    </Navbar.Collapse>

            </Navbar>

        )
    }
}

export default Navigation;
