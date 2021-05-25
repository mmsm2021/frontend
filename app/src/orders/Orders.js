import React from "react";
import {MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Link, useParams} from "react-router-dom";
import './orders.css'
import {FaReceipt} from "react-icons/all";
import {Badge, Button, Col, Form, InputGroup} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {OrderTable} from "./OrderService";

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
            path: "test",
            sidebar: <FormattedMessage id={"detail"}/>,
            main: () => <h2>Test</h2>
        },
        {
            path: "/orders/:id",
            main: (order) => <Details order={order}/>
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
    console.log("Getting active orders");

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

function Create() {
    let order;
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
                    {order.items.map((item) => (
                        <InputGroup className={"mb-3"}>
                            <Form.Control placeholder={item.name}/>
                            <InputGroup.Append>
                                <InputGroup.Text>DKK</InputGroup.Text>
                                <InputGroup.Text>{item.cost}</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    ))}
                    <Form.Text>Total: {order.total}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    <FormattedMessage id={"save"}/>
                </Button>
            </Form>
        </div>
    )
}

function Details(props) {
    let {id} = useParams();
    const order = props.order;
    if (!id) return null;
    return (
        order &&
        <div>
            <h2><FormattedMessage id={"detail"}/></h2>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridId">
                        <Form.Label><FormattedMessage id="orderId"/></Form.Label>
                        <Form.Control type="text" placeholder={order.orderId} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>Order Date</Form.Label>
                        <Form.Control type="date" placeholder={Date.now()} readOnly/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCustomer">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control type="email" placeholder={order.customer}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridServer">
                        <Form.Label>Waiter</Form.Label>
                        <Form.Control type="text" placeholder={order.server}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridItems">
                    <Form.Label>Items</Form.Label>
                    {order.items.map((item) => (

                        <InputGroup className={"mb-3"}>
                            <Form.Control placeholder={item.name}/>
                            <InputGroup.Append>
                                <InputGroup.Text>DKK</InputGroup.Text>
                                <InputGroup.Text>{item.cost}</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                    ))}
                    <Form.Text>Total: {order.total}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    <FormattedMessage id={"save"}/>
                </Button>
            </Form>
        </div>
    )
}
