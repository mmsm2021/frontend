import {OrderRoutes} from "./orders/Orders";
import {ProfileRoutes} from "./profile/Profile";
import {ProductRoutes} from "./products/Products";
import {Route, Switch} from "react-router-dom";
import React from "react";
import {FaBars} from "react-icons/all";
import {FormattedMessage} from "react-intl";
import {BookingRoutes} from "./booking/Booking";
import { makeStyles } from '@material-ui/core/styles';
const MainRoutes =[
    {
        path: "/",
        exact: true,
        sidebar: <FormattedMessage id="home"/>,
        main: () => <div><FormattedMessage id={"welcome"}/> </div>,
    },
    {
        path: "/about",
        sidebar: <FormattedMessage id="about"/>,
        main: () => <div><FormattedMessage id="about"/></div>
    }

]
const useStyle = makeStyles((theme) =>({
    root:{
        color: '#8199eb',

    },
}));
export const Main =({handleToggleSidebar, toggled}) =>{
    const classes = useStyle();
    let routes = [];
    routes = routes.concat(OrderRoutes, ProfileRoutes, ProductRoutes, MainRoutes, BookingRoutes);
    console.log(toggled);
    return(
        routes &&
        <main className={classes.root}>
            <div className="btn-toggle" style={{ display: `${toggled ? `none` : `flex`}`}} onClick={() => handleToggleSidebar(!toggled)} >
                <FaBars/>
            </div>
            <Switch>
                {routes.map((route) => (
                    <Route path={route.path}
                           exact={route.exact}
                           children={<route.main/>}/>
                ))}
            </Switch>
        </main>
    )
}
