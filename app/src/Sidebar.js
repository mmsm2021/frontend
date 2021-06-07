import {useAuth0} from "@auth0/auth0-react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from "react-pro-sidebar";
import React, {useContext, useState} from "react";
import {OrderMenu} from "./orders/Orders";
import {Profile} from "./profile/Profile";
import {ProductMenu} from "./products/Products";
import fd_logo from "./fd_logo.svg"
import bg1 from "./bg1.jpg";

import {AuthAction} from "./Navigation";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBars, FaHome} from "react-icons/all";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {Booking} from "./booking/Booking";
import {Button, Image} from "react-bootstrap";
import {LocationMenu, LocationSelect} from "./location/Location";
import {Context} from "./configuration/Store";

export const Sidebar = ({handleCollapsed, collapsed ,toggled, handleToggleSidebar, bgImage}) => {
    const {user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims} = useAuth0();
    const [state,dispatch] = useContext(Context);
    const collapseArrow = collapsed ? <FaArrowAltCircleRight/> : <FaArrowAltCircleLeft/>;
    let logo_url = fd_logo;
    try {
        const {branding} = state.location.metadata;
        logo_url = branding.logo_url;
    } catch (err){
        console.log(err);
    }
    return (

        <ProSidebar breakPoint="md"
                    image={bgImage ? bgImage : bg1}
                    collapsed={collapsed}
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
                    textAlign: 'center'
                }}>
                    <LocationSelect />
                <Image src={logo_url} thumbnail />
                    <h4>{state.location.name}</h4>

                </div>
            </SidebarHeader>
            <SidebarContent >
                <Menu iconShape={"circle"}>
                        <MenuItem icon={<FaHome/>}>
                            <FormattedMessage id={"home"}/>
                            <Link to={"/"}/>
                        </MenuItem>
                </Menu>
                {isAuthenticated &&
                <SidebarContent>
                        <LocationMenu/>

                        <OrderMenu/>

                        <ProductMenu/>

                        <Booking/>

                        <Profile/>

                </SidebarContent>
                }
            </SidebarContent>

            <SidebarFooter>
                <AuthAction/>
                <Button variant={"dark"} className={"btn-block"}
                        onClick={() => handleCollapsed(!collapsed)}>
                    {collapseArrow}
                </Button>
            </SidebarFooter>
        </ProSidebar>


    )
}
