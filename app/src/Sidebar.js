import {useAuth0} from "@auth0/auth0-react";
import {Menu, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
import React from "react";
import Orders from "./orders/Orders";
import {Profile} from "./profile/Profile";
import fd_logo from "./fd_logo.svg"
import bg1 from "./bg1.jpg";
import {Products} from "./products/Products";
import {AuthAction} from "./Navigation";

export const Sidebar = () => {
    const {user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims} = useAuth0();


    return (
        isAuthenticated && (
            <ProSidebar breakPoint={"md"}
                        image={bg1}
            >
                <SidebarHeader>

                    <img src={fd_logo}
                         alt={"company logo"}/>

                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape={"circle"}>
                        <Orders/>
                    </Menu>
                    <Menu iconShape={"circle"}>
                        <Products/>
                    </Menu>
                    <Menu iconShape={"circle"}>
                        <Profile/>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <AuthAction/>
                </SidebarFooter>
            </ProSidebar>
        )
    )
}
