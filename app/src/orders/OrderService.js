import { Button, Col, Form, InputGroup, ListGroup, Modal, Table} from "react-bootstrap";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import {Details} from "./Orders";
import {FaInfo, FaList, FaPlus} from "react-icons/all";
import {ProductPopup} from "../products/Products";
import {api, AuthApi} from "../services/ApiService";
export function ConvertJson(props) {
    console.log("Converting -> ", props);
    const retVal = [];
    for (let index in props.orders) {
        let obj = props.orders[index];
        let key = null;
        for (let ind in obj) {
            if (key == null) key = ind;
            obj = obj[ind];
            retVal.push(obj);
        }
    }
    return retVal;
}



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
                    <ListEntry key={obj.items.length + 1}
                               name={" "}
                               cost={" "}
                               handleChange={() => this.handleChange()}
                    />
                </div>
            );
        }
    }
    getCustomer = (id) =>{

        const encodedId = encodeURIComponent(id);
        AuthApi.get(`/users/${encodedId}`)
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
        alert(JSON.stringify())
    }
    componentDidMount() {

        try{
            let {id} = this.props;
            api.get(`/orders/${id}`).
            then(response => response.data)
                .then(data => {
                    this.setState({order: data});
                    this.getCustomer(data.orders.customer);
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
            return(
                <div className={"container-sm"}>
                    <h2><FormattedMessage id={"detail"}/></h2>
                    <Form onSubmit={() => this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridId">
                                <Form.Label>
                                    <h4><FormattedMessage id="orderId"/></h4>
                                </Form.Label>
                                <Form.Text><h5>{order.orderId}</h5></Form.Text>

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDate">
                                <Form.Label
                                ><h4>{<FormattedMessage id={"orderedAt"} />}</h4>
                                </Form.Label>
                                <Form.Text><h5>{ordered}</h5></Form.Text>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
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
                                        onSubmit={() => this.handleSubmit()}/>
                            <Form.Text>Total: {order.total}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            <FormattedMessage id={"save"}/>
                        </Button>
                    </Form>
                </div>
            )
        }
        return null;

    }
}




