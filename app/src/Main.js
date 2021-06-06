import {OrderRoutes} from "./orders/Orders";
import {ProfileRoutes} from "./profile/Profile";
import {ProductRoutes} from "./products/Products";
import {Route, Switch} from "react-router-dom";
import React, {useContext} from "react";
import {FaBars} from "react-icons/all";
import {FormattedMessage} from "react-intl";
import {BookingRoutes} from "./booking/Booking";
import { makeStyles } from '@material-ui/core/styles';
import {LocationRoutes, LocationSelect} from "./location/Location";
import {Container, Hidden} from "@material-ui/core";
import {Home} from "./Home";
import {Context} from "./configuration/Store";
import {Alerter} from "./services/AlertService";
const MainRoutes =[
    {
        path: "/",
        exact: true,
        sidebar: <FormattedMessage id="home"/>,
        main: () => <Home/>,
    },
    {
        path: "/about",
        sidebar: <FormattedMessage id="about"/>,
        main: () => <div><FormattedMessage id="about"/></div>
    }

]

export const Main =({handleToggleSidebar, toggled}) =>{
    const [state,dispatch] = useContext(Context);
    let routes = [];
    routes = routes.concat(OrderRoutes, ProfileRoutes, ProductRoutes, MainRoutes, BookingRoutes, LocationRoutes);
    console.log(toggled);
    if (state.error){
        return <Alerter type={'error'} message={state.error.message}/>
    }
    return(
        routes &&
        <main>
            <Hidden only={"lg"}>
            <div className="btn-toggle" style={{ display: `${toggled ? `none` : `flex`}`}} onClick={() => handleToggleSidebar(!toggled)} >
                <FaBars/>
            </div>
            </Hidden>
            <Container maxWidth={"xl"} fixed>
            <Switch>
                {routes.map((route) => (
                    <Route path={route.path}
                           exact={route.exact}
                           children={<route.main/>}/>
                ))}
            </Switch>
            </Container>
        </main>
    )
}
