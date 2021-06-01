import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Route, Switch} from "react-router-dom";
import {OrderRoutes} from "./orders/Orders";
import {ProfileRoutes} from "./profile/Profile";
import {ProductRoutes} from "./products/Products";
import {Sidebar} from "./Sidebar";
import {FaBars} from "react-icons/all";
import {Main} from "./Main";
import Navigation from "./Navigation";

function App() {
    const [toggled, setToggled] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };
    const handleCollapsed = (value) =>{
        setCollapsed(value);
    }
    const {isAuthenticated} = useAuth0();
    return (

        <div className={`shadow-lg app ${toggled ? 'toggled' : ''} `} >

                <Sidebar
                    handleCollapsed={handleCollapsed}
                    collapsed={collapsed}
                    handleToggleSidebar={handleToggleSidebar}
                    toggled={toggled}
                />
                <Main handleToggleSidebar={handleToggleSidebar}
                        toggled ={toggled}
                />

        </div>

    );
}

export default App;
