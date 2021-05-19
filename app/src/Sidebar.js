import {useAuth0} from "@auth0/auth0-react";
import {ProSidebar, SidebarHeader, SidebarContent, SidebarFooter, Menu, SubMenu, MenuItem} from "react-pro-sidebar";
import React from "react";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

export const Sidebar = () =>{
    const { user, isAuthenticated} = useAuth0();
    return(
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
                        <SubMenu title={"Profil"} >
                            <MenuItem>
                                <Link to="/profile">Oplysninger</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/profile/history">Historik</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/profile/settings">Indstillinger</Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    {user.email}
                </SidebarFooter>
            </ProSidebar>

        </div>
        )
    )
}
