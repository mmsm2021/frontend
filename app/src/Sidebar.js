import {useAuth0} from "@auth0/auth0-react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import React, {useState} from "react";
import Orders from "./orders/Orders";
import {Profile} from "./profile/Profile";
import {Products} from "./products/Products";
import fd_logo from "./fd_logo.svg"
import bg1 from "./bg1.jpg";

import {AuthAction} from "./Navigation";
import {FaBars, FaHome} from "react-icons/all";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {Booking} from "./booking/Booking";

export const Sidebar = ({toggled, handleToggleSidebar}) => {
    const {user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims} = useAuth0();


    return (

        <ProSidebar breakPoint="md"
                    image={bg1}
                    toggled={toggled}
                    onToggle={handleToggleSidebar}>
            <SidebarHeader>
                <div style={{
                    padding: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>                <img src={fd_logo}
                                        alt={"company logo"}/></div>


            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape={"circle"}>
                    <SubMenu icon={<FaHome/>} title={"Menu"}>
                        <MenuItem>
                            <FormattedMessage id={"home"}/>
                            <Link to={"/home"}/>
                        </MenuItem>
                        <MenuItem>
                            <FormattedMessage id={"about"}/>
                        </MenuItem>
                        <MenuItem>
                            <FormattedMessage id={"contact"}/>
                        </MenuItem>
                    </SubMenu>
                </Menu>
                {isAuthenticated &&
                <SidebarContent>
                    <Menu iconShape={"circle"}>
                        <Orders/>
                    </Menu>
                    <Menu iconShape={"circle"}>
                        <Products/>
                    </Menu>
                    <Menu iconShape={"circle"}>
                        <Booking/>
                    </Menu>
                    <Menu iconShape={"circle"}>
                        <Profile/>
                    </Menu>
                </SidebarContent>
                }
            </SidebarContent>

            <SidebarFooter>
                <AuthAction/>

            </SidebarFooter>
        </ProSidebar>


    )
}
