import React, {useEffect, useState} from "react";
import {Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link, useParams} from "react-router-dom";
import './orders.css'
import {FaReceipt} from "react-icons/all";
import { Formik, Form, Field, FieldArray } from 'formik';
import {FormattedMessage} from "react-intl";
import {api, OrderDetails} from "./OrderService";
import OrderTable from "./OrderTable";
import {useAuth0} from "@auth0/auth0-react";
import {UserOrder} from "./UserOrder";

export const OrderRoutes =
    [
        {
            path: "/orders",
            exact: true,
            sidebar: <FormattedMessage id={"orderPlural"}/>,
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

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            orders: [],
        }
    }

    componentDidMount() {
        console.log('Component mount');
        this.setState({isLoading: true});


    }

    render() {
        delete OrderRoutes[0];


        return (
            <Menu iconShape={"circle"}>
                <SubMenu title={<FormattedMessage id={"orderPlural"}/>}
                         icon={<FaReceipt/>}>
                    {OrderRoutes.map((route, index) => (

                        <MenuItem key={index} >
                            <Link to={route.path}>{route.sidebar}</Link>
                        </MenuItem>
                    ))}

                </SubMenu>
            </Menu>
        )
    }
}

export default Orders;


const Active = () => {

    return (

        <div>
            <h2>Active</h2>

            <OrderTable which="active"/>
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

const Create = () =>{
    const {user} = useAuth0();
    const userIs = user['https://frandine.randomphp.com/roles'];
    console.log(userIs);
    if (userIs[0] === "Customer"){
        return <UserOrder/>
    }

    return (
        <>
            <h2>New order</h2>
            <Formik
                initialValues={{
                    customer: {
                        name: '',
                        email: ''
                    },
                    items:[]
                }}
                onSubmit={async (values) =>{
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                render={({ values }) =>(
                    <Form className={"form"}>
                        <FieldArray
                            name="items"
                            render={arrayHelpers => (
                                <div className={"form-group"}>
                                    {values.items && values.items.length > 0 ? (
                                        values.items.map((item, index) => (
                                            <div key={index}>
                                                <Field name={`items.${index}`} />
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <button type="button" onClick={() => arrayHelpers.push('')}>
                                            {/* show this when user has removed all friends from the list */}
                                            Add item
                                        </button>
                                    )}
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
                />
        </>
    )
}

function Details() {

    let {id} = useParams();


    if (!id) return null;
    return (
        <OrderDetails id={id}/>

    )
}
