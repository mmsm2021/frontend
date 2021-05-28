import React, {useEffect, useState} from "react";
import {MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Link, useParams} from "react-router-dom";
import './orders.css'
import {FaReceipt} from "react-icons/all";
import {Badge, Button, Col, Form, InputGroup} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {api, OrderDetails, OrderTable} from "./OrderService";
import axios from "axios";

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


//     for (let index in data.orders) {
//         let obj = data.orders[index];
//         let key = null;
//         for (let ind in obj) {
//             if (key == null) key = ind;
//             obj = obj[ind];
//             cdm_orders.push(obj);
//         }
//     }
//     console.log(cdm_orders);
//     this.setState({orders: cdm_orders,
//         isLoading: false});
// },
// (error) => {
//     console.log(error.message);
//     this.setState({
//         isLoading: true,
//         error
//     });
// });


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
        delete OrderRoutes.last;
        const isLoading = this.state.isLoading;

        return (

            <SubMenu title={<FormattedMessage id={"orderPlural"}/>}
                     icon={<FaReceipt/>}>
                {OrderRoutes.map((route, index) => (

                    <MenuItem key={index} suffix={<Badge variant="light" pill>{OrderRoutes.length}</Badge>}>
                        <Link to={route.path}>{route.sidebar}</Link>
                    </MenuItem>
                ))}

            </SubMenu>
        )
    }
}

export default Orders;


const Active = () => {

    return (

        <div>
            <h2>Active</h2>

            <OrderTable which="active" useMockdata={true} />
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
    let order;
    let items=[];
    const addItem = event =>{

    }
    return (
        <div>
            <h2>New order</h2>
            <Form>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCustomer">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control type="email" placeholder="Email"/>
                        <Form.Control type="text" placeholder="Name"/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridServer">
                        <Form.Label>Waiter</Form.Label>
                        <Form.Control type="text" placeholder=""/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridItems">
                    <Form.Label>Items</Form.Label>

                    <Form.Text>Total: </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    <FormattedMessage id={"save"}/>
                </Button>
            </Form>
        </div>
    )
}

function Details() {

    let {id} = useParams();


    if (!id) return null;
    return (
        <OrderDetails id={id}/>

    )
}
