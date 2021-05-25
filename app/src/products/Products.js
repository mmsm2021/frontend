import {FormattedMessage} from "react-intl";
import React from "react";
import {MenuItem, SubMenu} from "react-pro-sidebar";
import {FaList} from "react-icons/all";
import {Link} from "react-router-dom";


export const ProductRoutes = [

    {
        path: "/products",
        exact: true,
        sidebar: <FormattedMessage id={"products"}/>,
        main: () => <h2><FormattedMessage id={"productOverview"}/></h2>,
    },
    {
        path: "/products/new",
        sidebar: <FormattedMessage id={"productNew"}/>,
        main: () => <h2><FormattedMessage id={"productNew"}/></h2>
    }

]
export const Products = () => {
    return (
        <>
            <SubMenu title={<FormattedMessage id={"products"}/>}
                     icon={<FaList/>}>
                {ProductRoutes.map((route, index) => (

                    <MenuItem key={index}>
                        <Link to={route.path}>{route.sidebar}</Link>
                    </MenuItem>
                ))}

            </SubMenu>
        </>
    )
}
