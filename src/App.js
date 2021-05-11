import './App.css';
import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Avatar} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const classes = useStyles();
    if (isLoading) {
        return <div>Loading ...</div>;
    }
    if (!isAuthenticated){
        return <LoginButton/>
    }
    return (

        isAuthenticated && (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <Avatar src={user.picture} alt={user.name} className={classes.large}/>

                        <Button color="inherit"><LogoutButton/></Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    );
};
const LoginButton = () =>{
    const { loginWithRedirect } = useAuth0();

        return <Button variant="contained"
                       color="primary"
                       size="large"
                       onClick={() => loginWithRedirect()}>Login</Button>;

}
const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => logout({ returnTo: window.location.origin })}>
            Log ud
        </Button>
    );
};

function App() {

    return (
    <div className="Landing-page">
        <Profile />
    </div>

  );
}

export default App;
