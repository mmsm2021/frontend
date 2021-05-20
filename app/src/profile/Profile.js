import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";


const GetInfo = () => {
    const {user, isAuthenticated} = useAuth0();
    if (isAuthenticated) {
        return user;
    }

}

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowed: false,
            data: [],
            routes: [
                {
                    path: "/profile",
                    exact: true,
                    sidebar: () => <FormattedMessage id="profile"/>,
                    main: () => Overview(GetInfo),
                },
                {
                    path: "/profile/history",
                    sidebar: () => <FormattedMessage id="history"/>,
                    main: () => <FormattedMessage id="history"/>
                },
                {
                    path: "/profile/settings",
                    sidebar: () => <FormattedMessage id="settings"/>,
                    main: () => <FormattedMessage id="settings"/>
                }
            ],

        }
    }

    render() {
        const {data, routes} = this.state;

        return (
            <div>
                <ProSidebar>

                    <SidebarHeader className="bg justify-content-md-center">
                        <div className="sh">

                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape={"circle"}>
                            <SubMenu title={<FormattedMessage id={"account"}/>}>
                                {routes.map((route, index) => (
                                    <MenuItem key={index}>
                                        <Link to={route.path}>{route.sidebar()}</Link>
                                    </MenuItem>
                                ))}
                                {/*<MenuItem>*/}
                                {/*    <Link to="/profile">Oplysninger</Link>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem>*/}
                                {/*    <Link to="/profile/history">Historik</Link>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem>*/}
                                {/*    <Link to="/profile/settings">Indstillinger</Link>*/}
                                {/*</MenuItem>*/}
                            </SubMenu>
                        </Menu>
                    </SidebarContent>

                </ProSidebar>
            </div>
        )
    }

}

function Overview(props) {
    return (
        <div>
            <h2><FormattedMessage id={"profile"}/></h2>

        </div>
    )
}

const Sidebar = () => {
    const {user, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
            <div className={"position-sticky"}>
                <ProSidebar>

                    <SidebarHeader className="bg justify-content-md-center">
                        <div className="sh">
                            {user.name}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape={"circle"}>
                            <SubMenu title={<FormattedMessage id={"profile"}/>}>

                                {/*<MenuItem>*/}
                                {/*    <Link to="/profile">Oplysninger</Link>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem>*/}
                                {/*    <Link to="/profile/history">Historik</Link>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem>*/}
                                {/*    <Link to="/profile/settings">Indstillinger</Link>*/}
                                {/*</MenuItem>*/}
                            </SubMenu>
                        </Menu>
                    </SidebarContent>

                </ProSidebar>

            </div>
        )
    )
}
