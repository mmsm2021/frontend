import { Button, Col, Form, InputGroup, ListGroup, Modal, Table} from "react-bootstrap";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import {Details} from "./Orders";
import {FaInfo, FaList, FaPlus} from "react-icons/all";
import {ProductPopup} from "../products/Products";
import {api, AuthApi, OrderApi} from "../services/ApiService";
import {NotFound} from "../NotFound";


function ListEntry(props){
    return(
        <InputGroup className={"mb-3"} key={props.key}>
            <Form.Control placeholder={props.name} value={props.name} onChange={() => props.handleChange}/>
            <InputGroup.Append>
                <InputGroup.Text>{props.cost}</InputGroup.Text>
                <InputGroup.Text>DKK</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    )
}

export class OrderDetails extends React.Component{
    state ={

        order: {},
        customer:{},
        itemName: "",
        modalShow: false,
        error: ""
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        if (this.props.order){
            this.setState({order: this.props.order});
        }

    }
    getOrder = async () => {
        try{
            let {id} = this.props;
            await api.get(`/orders/${id}`).
                then(response => response.data)
                .then(data => {
                    this.setState({order: data});

                });
        } catch (e){
            console.log(e);
            this.setState({error: e});
        }
    }
    generateItemList = () =>{
        const obj = this.state.order.orders;
        if(obj){
            console.log(obj.items);
            return(
                <div>
                    {obj.items.map((item,index)=>(
                        <ListEntry  key={index}
                                    name={item.name}
                                    cost={item.cost}

                        />
                    ))}
                </div>
            );
        }
    }
    getCustomer = async (id) =>{
        if (id === null) return;
        if (this.state.customer) return;
        const encodedId = encodeURIComponent(id);
        await AuthApi.get(`/users/${encodedId}`)
            .then(response => this.setState({customer: response.data}))
            .catch(error => console.log(error.message));
    }
    handleChange(event){
        const {name, value} = event;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        alert(JSON.stringify(event.target.value, null, 2))
        // OrderApi.patch(`/${}`)
    }
    handleSelect(event){
        event.preventDefault();
        alert(JSON.stringify(event.target.value,null,2))
    }
    handleDelivered(order){
        let deliveries = {
            location: order.locationId,
            items:[]
        };

        order.items.map((item)=>(
            deliveries.items.push({itemUUID: item.itemUUID, delivered: true})
        ));
        console.log(deliveries);
        OrderApi.patch(`/delivered/${order.orderId}`,deliveries )
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        console.clear();
        try{
            let {id} = this.props;
            api.get(`/orders/${id}`).
            then(response => response.data)
                .then(data => {
                    this.setState({order: data});
                    console.log(data);
                });
        } catch (e){
            console.log(e);
            this.setState({error: e});
        }

    }

    render() {
        const order = this.state.order.orders;
        const {customer} = this.state;
        if (order){
            let ordered = new Date(order.orderDate).toString();
            const {customer} = this.state;
            return(
                <>
                    <Form noValidate onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridId">
                                <Form.Label>
                                    <h4><FormattedMessage id="orderId"/></h4>
                                </Form.Label>
                                <Form.Text><h5>{order.orderId}</h5></Form.Text>
                                <Form.Text><h5>{ordered}</h5></Form.Text>

                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Order status</Form.Label>
                            <Form.Control as={"select"}
                                          type={"number"}
                                          value={order.orderStatus}
                                          name={"orderStatus"}
                                          onChange={this.handleChange}>
                                <option value={0}>Waiting</option>
                                <option value={1}>In progress</option>
                                <option value={2}>Finished</option>
                            </Form.Control>
                            <Form.Group as={Col} controlId="formGridCustomer">
                                <Form.Label><FormattedMessage id={"customer"}/></Form.Label>
                                <Form.Text>{customer.name}</Form.Text>
                                <Form.Text><a href={customer.email}>{customer.email}</a></Form.Text>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridServer">
                                <Form.Label><FormattedMessage id={"server"}/></Form.Label>
                                <Form.Control type="text"
                                              value={order.server}
                                              name={"server"}
                                              placeholder={order.server}
                                              onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group as={Col} md={5} controlId="formGridItems">
                            <Form.Label>Items</Form.Label>
                            {this.generateItemList()}
                            <Button className={"float-md-right"}
                                    variant={"outline-secondary"}
                                    children={<FaPlus/>}
                                    onClick={() => this.setState({modalShow: true})}
                            />
                           <ProductPopup show={this.state.modalShow}
                                         onHide={()=>this.setState({modalShow: false})}
                                        onSubmit={() => this.handleSubmit()}
                                        onSelect={() => this.handleSelect}/>
                            <Form.Text>Total: {order.total}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            <FormattedMessage id={"save"}/>
                        </Button>
                        <Button variant={"secondary"} onClick={() => this.handleDelivered(order)}>
                            Deliver
                        </Button>
                    </Form>
                </>
            )
        }
        return <NotFound what={this.props}/>;

    }
}




