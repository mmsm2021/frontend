import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {FaUser} from "react-icons/all";

export const ProfileRoutes = [
    {
        path: "/profile",
        exact: true,
        sidebar: <FormattedMessage id="profile"/>,
        main: () => <Overview metadata={<Meta/>}/>,
    },
    {
        path: "/profile/history",
        sidebar: <FormattedMessage id="history"/>,
        main: () => <FormattedMessage id="history"/>
    },
    {
        path: "/profile/settings",
        sidebar: <FormattedMessage id="settings"/>,
        main: () => <FormattedMessage id="settings"/>
    }
];

const Meta = () => {
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    return (
        isAuthenticated && (
            <div>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
            </div>
        )
    );
}

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowed: false,
            data: [],

        }
    }

    render() {
        const routes = ProfileRoutes;

        return (

            <SubMenu title={<FormattedMessage id={"account"}/>}
                     icon={<FaUser/>}>
                {routes.map((route, index) => (
                    <MenuItem key={index}>
                        <Link to={route.path}>{route.sidebar}</Link>
                    </MenuItem>
                ))}
            </SubMenu>


        )
    }

}

function Overview(props) {
    return (
        <div>
            <h2><FormattedMessage id={"profile"}/></h2>
            {props.metadata}
        </div>
    )
}

