import { Button, Col, Form, InputGroup, ListGroup, Modal, Table} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {FormattedMessage} from "react-intl";
import {Link, useParams} from "react-router-dom";
import {Details} from "./Orders";
import {FaInfo, FaList, FaPlus} from "react-icons/all";
import {ProductPopup} from "../products/Products";
import {Alerter} from "../services/AlertService";
import {api} from "../services/ApiService";
import mockdata from "./mockOrders.json";
import {DataGrid} from "@material-ui/data-grid";
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

export class  OrderDetails extends React.Component{
    state ={

        order: {},
        itemName: "",
        modalShow: false,
        error: ""
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }
    getOrder = async () => {
        try{
            let {id} = this.props;
            await api.get(`/orders/${id}`).
                then(response => response.data)
                .then(data => this.setState({order: data}));
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
    handleChange(e){
    }
    handleSubmit(e){
        e.preventDefault();

    }
    componentDidMount() {
       this.getOrder();
    }

    render() {
        const order = this.state.order.orders;

        if (order){
            console.log(order);

            return(
                <div>
                    <h2><FormattedMessage id={"detail"}/></h2>
                    <Form onSubmit={() => this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridId">
                                <Form.Label><FormattedMessage id="orderId"/></Form.Label>
                                <Form.Control type="text" placeholder={order.orderId} readOnly/>

                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridDate">
                                <Form.Label>{<FormattedMessage id={"orderedAt"} />}
                                </Form.Label>
                                <Form.Control type="date" value={order.orderDate.date} readOnly/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCustomer">
                                <Form.Label><FormattedMessage id={"customer"}/></Form.Label>
                                <Form.Control type="email" placeholder={order.customer}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridServer">
                                <Form.Label><FormattedMessage id={"server"}/></Form.Label>
                                <Form.Control type="text" placeholder={order.server}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridItems">
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
async function GetNameById(userId){
    let axios = require("axios").default;
    let information;
    let customerName = '';
    const encodedId = encodeURIComponent(userId);
    let options = {
        method: 'GET',
        url: `https://mmsm.eu.auth0.com/api/v2/users/${encodedId}`,
        headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllGU0lUT1RpczVmWUsyTlpURUJsciJ9.eyJpc3MiOiJodHRwczovL21tc20uZXUuYXV0aDAuY29tLyIsInN1YiI6InN5TkFyYjQ5czFkVmJ0bDhZNmt0TmY3ZzBBTFNSNTA2QGNsaWVudHMiLCJhdWQiOiJodHRwczovL21tc20uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2MjIyMTE3MjMsImV4cCI6MTYyMjI5ODEyMywiYXpwIjoic3lOQXJiNDlzMWRWYnRsOFk2a3ROZjdnMEFMU1I1MDYiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.DqxE9d4sQJgOJOqbBh2wdmWA6L8FLbLvL0V54nbioqbvtjLDZBbLfC-YiF3pm_QDecMGv6SvGf6sM1EMePl0AlinoVDNvW8o-rjq9OIYR3GOSL_T-1w0IGEjHX0lWhtWdDkxrgLuptE5Ufn1KrHt0Tsu_JKH-d55OuV_TpRdGvMRVZOPMXDMuKpWiu2_xoeIubCCd7-iaFVluxdSCtxaRn6LQbgwSbgkqH8hj1OT4Ft8G3ygsTnMsxgysrR4Ys5a7uOXdZk33g4tFcgjfgiT93LhSuD_yIFtFuCuOyTl9mb2J8fUVbHoO5N2aCrDNaBYG_mIx8soGtfis1d1O1yAXQ`
        }
    };

    await axios.request(options).then(function (response) {
        console.log(response.data.family_name);
        information = response.data;
        customerName = response.data.family_name;
        return customerName;
    }).catch(err => console.log(err));


}
const columns = [
    { field: 'orderId', headerName: 'Order ID' },
    { field: 'orderStatus', headerName: 'Status',
        valueFormatter: (params) => params.value ? 'In progress' : 'Delivered',


    },
    { field: 'server', headerName: 'Waiter'},
    {

        field: 'items',
        headerName: 'Pre-Orders',
        type: 'string',
        valueFormatter: (params) => params.value.map((item)=>item.name)
    },
    {
        field: 'customer',
        headerName: 'Customer',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        // valueFormatter: async (params) => await GetNameById(params.value)


        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //         params.getValue(params.id, 'lastName') || ''
        //     }`,
    },
    {
        field: 'orderDate',
        headerName: 'Order Date',
        valueFormatter: (params) => params.value = new Date(params.value),
    },
    {
        field: 'actions',
        renderCell: (params) =>(
            <Link to={"/orders/60a771765049320d4745e092"}>
            <Button variant={"outline-primary"}>
                <FaInfo/>
            </Button>
                </Link>
        )
    }
];
export class OrderTable extends React.Component{
    state={
        data: [],
        status: "",
        isLoading: true
    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.useMockdata){
            this.fetchOrders();
        }else {
            this.setState({data: mockdata, isLoading: false});;
        }
    }


    fetchOrders(){
        fetch("https://frandine.randomphp.com/api/v1/orders/23/last/10",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('bearer')}`
            }
        }).then(res => res.json())
            .then(json =>{
                console.log(json);
                this.setState({data: json.data, isLoading: false});
            }).catch(err => this.setState({status: err.message}));
    }
    getOrders(){
        api.get("/orders/23/last/10",{ method: "GET"}).then(res =>{
            console.log(res);
            this.setState({data: res.data.orders});
        })
            .catch(err => {
                console.log(err.message);
                this.setState({status: err.message})
            });
    }
    render() {

    const {data, status, isLoading} = this.state;
        if (status && !this.props.useMockdata) {
            console.log(status);
            return <Alerter message={status} type={"error"}/>;
        }
        if (isLoading) return <Alerter message={"Loading data..."} type={"success"}/>;
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={data.orders}
                          columns={columns}
                          pageSize={5}
                          getRowId={(row)=> row.orderId}
                          />
            </div>
        );
    }

}


