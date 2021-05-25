import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Route, Switch} from "react-router-dom";
import {OrderRoutes} from "./orders/Orders";
import {ProfileRoutes} from "./profile/Profile";
import {ProductRoutes} from "./products/Products";
import {FaBars} from "react-icons/all";

function App() {
    let routes = [];
    routes = routes.concat(OrderRoutes, ProfileRoutes, ProductRoutes);
    const {isAuthenticated} = useAuth0();
    return (
        isAuthenticated &&
        <>
            <div className="btn-toggle">
                <FaBars/>
            </div>
            <Switch>
                {routes.map((route) => (
                    <Route path={route.path}
                           exact={route.exact}
                           children={<route.main/>}/>
                ))}
            </Switch>
        </>

    );
}

export default App;
