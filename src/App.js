import './App.css';
import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@material-ui/core";



const LoginButton = () =>{
    const { loginWithRedirect } = useAuth0();
    if (useAuth0().isAuthenticated) {
        return <Button variant="contained"
                       color="primary"
                       size="large"
                       onClick={() => loginWithRedirect()}>Start working</Button>;
    } else{
        return <LogoutButton />;
    }
}
const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </Button>
    );
};

function App() {

    return (
    <div className="Landing-page">
        <LoginButton/>

    </div>

  );
}

export default App;
