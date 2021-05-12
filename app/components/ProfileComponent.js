import React from "react";
import ReactDOM from "react-dom";
import {Avatar} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
const UserAvatar =()=>{
    const { user, isAuthenticated, isLoading } = useAuth0();
    return <Avatar src={user.picture} alt={user.name} />;
}
function RenderUA(){
    const elem = <UserAvatar />;
    ReactDOM.render(elem, document.getElementById("app-main-content"));
}
class ProfileComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            userData: undefined,
            auth: Array
        }

    }

    render() {

        return <h1>Hi</h1>;
    }


}
