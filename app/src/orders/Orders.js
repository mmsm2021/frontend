import React from "react";
import axios from "axios";
import {ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, SubMenu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Link, Switch, Route} from "react-router-dom";
import './orders.css'
import {FaReceipt, FaUser, FaCheckSquare} from "react-icons/all";
import {Badge, Button, Col, Form, InputGroup, Table} from "react-bootstrap";

export const OrderRoutes = [
    {
        path: "/orders",
        exact: true,
        sidebar: () => <p>Ordre</p>,
        main: () => <h2>Oversigt</h2>,
    },{
        path: "/orders/active",
        sidebar: () => <p>Igangværende</p>,
        main: (props) => <Active/>
    },
    {
        path: "/orders/queue",
        sidebar: () => <p>Modtaget</p>,
        main: (props) => <Queue/>
    },
    {
        path: "/orders/finished",
        sidebar: () => <p>Afsluttede</p>,
        main: () => <h2>Afsluttede ordre</h2>
    },
    {
        path: "/orders/:id",
        main: (order) => <Details order={order}/>
    }];

class Orders extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            error: null,
            isLoading: false,
            orders:[]
        }
    }

    componentDidMount() {
        console.log('Component mount');
        fetch('https://frandine.randomphp.com/api/orders/23/last/2')
            .then(res => console.log(res) )
            .then(json => {
                this.setState({
                    isLoading: true,
                    orders: json
                });
                console.log(json);
            },
            (error)=>{
                this.setState({
                    isLoading: true,
                    error
                });
            });
    }
    render() {
        return(
            <div style={{ display: "flex" }}>
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
                    <Menu iconShape={"round"} >
                        <SubMenu title="Ordre"
                                 icon={<FaReceipt/>}>
                            <MenuItem suffix={<Badge variant="light" pill>5</Badge>}>
                                <Link to="/orders/active">Igangværende</Link>
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
                <SidebarFooter style={{ textAlign: 'center' }}>

                </SidebarFooter>
            </ProSidebar>
                <div style={{ flex: 1, padding: "10px" }}>
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
}export default Orders;

function Active(){

    return(
        <div>
            <h2>Active</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                <th>orderId</th>
                <th>orderDate</th>
                <th>customer</th>
                <th>server</th>
                {/*<th>{' '}</th>*/}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>60a37529b2131e38b375a615</td>
                    <td>2021-05-18 08:04:57</td>
                    <td>anotherdude@theinternet.com</td>
                    <td>Palle Bertelsen</td>
                    <td><Link to="/orders/1"> <Button variant={"outline-secondary"} className={"sm"}>Info</Button> </Link></td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}
function Queue(){
    return(
        <div>
        <h2>Modtaget Ordre</h2>
        </div>
    )
}
function Details(props){
    return(
        <div>
            <h2>Details</h2>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridId">
                        <Form.Label>Order ID</Form.Label>
                        <Form.Control type="text" placeholder="60a37529b2131e38b375a615" readOnly />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>Order Date</Form.Label>
                        <Form.Control type="date" placeholder="2021-05-18 08:04:57" readOnly />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCustomer">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control type="email" placeholder="anotherdude@theinternet.com" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridServer">
                        <Form.Label>Waiter</Form.Label>
                        <Form.Control type="text" placeholder="Palle Bertelsen" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridItems">
                    <Form.Label>Items</Form.Label>
                    <InputGroup className={"mb-3"}>
                        <Form.Control placeholder="Cheese Burger, XL" />
                        <InputGroup.Append>
                            <InputGroup.Text>DKK</InputGroup.Text>
                            <InputGroup.Text>55</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup className={"mb-3"}>
                        <Form.Control placeholder="Coca Cola 0,5L" />
                        <InputGroup.Append>
                            <InputGroup.Text>DKK</InputGroup.Text>
                            <InputGroup.Text>10</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    )
}
