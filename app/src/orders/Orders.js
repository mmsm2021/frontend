import React from "react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Link, Route, Switch, useParams} from "react-router-dom";
import './orders.css'
import {FaCheckSquare, FaReceipt} from "react-icons/all";
import {Badge, Button, Col, Form, InputGroup} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {OrderTable} from "./OrderService";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            orders: [],
            routes: [
                {
                    path: "/orders",
                    exact: true,
                    sidebar: () => <p><FormattedMessage id="orders.plural"/></p>,
                    main: () => <h2>Overview</h2>,
                }, {
                    path: "/orders/active",
                    sidebar: () => <p>Igangværende</p>,
                    main: (orders) => <Active orders={this.state.orders}/>
                },
                {
                    path: "/orders/queue",
                    sidebar: () => <p>Modtaget</p>,
                    main: () => <Queue orders={this.state.orders}/>
                },
                {
                    path: "/orders/finished",
                    sidebar: () => <p>Afsluttede</p>,
                    main: () => <h2>Afsluttede ordre</h2>
                },
                {
                    path: "/orders/:id",
                    main: (order) => <Details order={order}/>
                }]
        }
    }

    componentDidMount() {
        console.log('Component mount');
        this.setState({isLoading: true});
        const cdm_orders = [];
        fetch('https://frandine.randomphp.com/api/orders/23/last/3')
            .then(response => response.json())
            .then(data => {
                    for (let index in data.orders) {
                        let obj = data.orders[index];
                        let key = null;
                        for (let ind in obj) {
                            if (key == null) key = ind;
                            obj = obj[ind];
                            cdm_orders.push(obj);
                        }
                    }

                    this.setState({orders: cdm_orders});
                },
                (error) => {
                    this.setState({
                        isLoading: true,
                        error
                    });
                });

    }

    render() {
        const OrderRoutes = this.state.routes;
        return (
            <div style={{display: "flex"}}>
                <ProSidebar>
                    <SidebarHeader className="bg">
                        {/**
                         *  You can add a header for the sidebar ex: logo
                         */}
                        <div className="sh">
                            Komponenter
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="bg">
                        {/**
                         *  You can add the content of the sidebar ex: menu, profile details, ...
                         */}
                        <Menu iconShape={"round"}>
                            <SubMenu title={<FormattedMessage id="orderPlural"/>}
                                     icon={<FaReceipt/>}>
                                <MenuItem suffix={<Badge variant="light" pill>5</Badge>}>
                                    <Link to="/orders/active">
                                        Igangværende
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/orders/queue">Modtaget</Link>
                                </MenuItem>
                                <MenuItem icon={<FaCheckSquare/>}>
                                    <Link to="/orders/finished">Afsluttede</Link>
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter style={{textAlign: 'center'}}>

                    </SidebarFooter>
                </ProSidebar>
                <div style={{flex: 1, padding: "10px"}}>
                    <Switch>
                        {OrderRoutes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different components this time.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main/>}
                            />
                        ))}
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Orders;

function Active(props) {

    return (
        <div>
            <h2>Active</h2>
            <OrderTable orders={props.orders}/>
        </div>
    );
}

function Queue(props) {

    return (
        <div>
            <h2>Order Queue</h2>
            <OrderTable orders={props.orders}/>
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
