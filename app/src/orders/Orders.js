import React, {useContext, useEffect, useState} from "react";
import {Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link, useParams} from "react-router-dom";
import './orders.css'
import {FaReceipt} from "react-icons/all";
import { Formik, Field, FieldArray } from 'formik';
import {FormattedMessage} from "react-intl";
import {OrderDetails} from "./OrderService";
import OrderTable from "./OrderTable";
import {useAuth0} from "@auth0/auth0-react";
import {UserOrder} from "./UserOrder";
import {ProductOverview} from "../products/Products";
import {Context} from "../configuration/Store";
import {Form, Col, ListGroup} from "react-bootstrap";
import {api} from "../services/ApiService";
import OrderForm from "./OrderForm";

export const OrderRoutes =
    [
        {
            path: "/orders",
            exact: true,
            // sidebar: <FormattedMessage id={"orderPlural"}/>,
            main: () => <h2>Overview</h2>,
        },
        {
            path: "/orders/active",
            sidebar: <FormattedMessage id={"active"}/>,
            main: () => <Active/>,
        },
        {
            path: "/orders/queue",
            sidebar: <FormattedMessage id={"queue"}/>,
            main: (orders) => <Queue orders={orders}/>
        },
        {
            path: "/orders/finished",
            sidebar: <FormattedMessage id={"finished"}/>,
            main: () => <Finished/>
        },
        {
            path: "/orders/new",
            sidebar: <FormattedMessage id={"newOrder"}/>,
            main: () => <Create/>
        },
        {
            path: "/orders/:id",
            main: () => <Details />
        }];

export const OrderMenu = () =>{
    return (
        <Menu iconShape={"circle"}>
            <SubMenu title={<FormattedMessage id={"orderPlural"}/>}
                     icon={<FaReceipt/>}>
                {OrderRoutes.map((route, index) => {
                    if (!route.sidebar) return null;
                    return (
                        <MenuItem key={index} >
                            <Link to={route.path}>{route.sidebar}</Link>
                        </MenuItem>
                    )}
                )}

            </SubMenu>
        </Menu>
    )
}


const Active = () => {
const [state] = useContext(Context);
const roles = state.user["https://frandine.randomphp.com/roles"];
console.log(roles)
    if (roles[0] === "Customer"){
        console.clear();
        return <OrderTable which={"user"} id={state.user.sub}/>
    }
    return (

        <div>
            <h2>Active</h2>

            <OrderTable which="active" id={state.location.id}/>
        </div>
    );
}

function Queue() {

    return (

        <div>
            <h2>Order Queue</h2>
            <OrderTable which="queue"/>
        </div>
    )
}

const Finished = () => {
    return (
        <div>
            <h2>Finished</h2>

            <OrderTable which="finished"/>
        </div>
    )
}

export const Create = () =>{
    const[state,dispatch] = useContext(Context);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(async () =>{

            await api.get(`/products?locationId=${state.location.id}`)
                .then(res => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(err => dispatch({type:'SET_ERROR', payload:err}));
    },[]);

    if (state.user['https://frandine.randomphp.com/roles'][0] === "Customer"){
        return <UserOrder/>
    }
    return (
        <OrderForm/>
    )
}

function Details() {

    let {id} = useParams();


    if (!id) return null;
    return (
        <OrderDetails id={id}/>

    )
}
