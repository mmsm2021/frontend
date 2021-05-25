import {Table} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

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

export const GetOrders = async () => {
    const {user, getIdTokenClaims} = useAuth0();
    let bearer;
    let orders = [];
    try {
        await getIdTokenClaims().then(result => bearer = result.__raw);
    } catch (e) {
        console.log(e.message);
    }
    try {
        await axios.get("https://frandine.randomphp.com/api/v1/orders/23/last/10", {
            headers: {
                authorization: `Bearer ${bearer}`
            }
        }).then(function (response) {
            response.data.orders.map((order) => {
                    orders.push(order);
                }
            );
        });

    } catch (e) {
        console.log(e);
    }
    return orders;
}
const GetBearer = () => {
    const {getIdTokenClaims} = useAuth0();
    let bearer;
    try {
        getIdTokenClaims().then(result => bearer = result.__raw);
    } catch (e) {
        console.log(e);
    }
    return bearer;
}

export function GetOrder(props) {
    console.log("Getting Order: ", props.id);
    let retVal;
    fetch('https://frandine.randomphp.com/api/v1/orders/' + props.id)
        .then(response => response.json())
        .then(data =>
            retVal = ConvertJson(data.orders));
    return retVal;
}

export const SortedOrder = async () => {
    const [bearer, setBearer] = useState(null);
    const {getIdTokenClaims} = useAuth0();

    let orders = [];
    getIdTokenClaims().then(res => setBearer(res.__raw))
        .catch(err => console.log(err.message));
    console.log(bearer);
    localStorage.setItem('bearer', bearer);


};

export function OrderTable(props) {

    if (true) {
        return <div>No results</div>
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>orderId</th>
                    <th>orderDate</th>
                    <th>customer</th>
                    <th>server</th>
                    <th>items</th>
                    {/*<th>{' '}</th>*/
                    }

                </tr>
                </thead>
                <tbody>
                {props.orders.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        {/*<td>{order.orderDate}</td>*/}
                        <td>{order.customer}</td>
                        <td>{order.server}</td>
                        {/*<td>{order.items.length}</td>*/}
                    </tr>
                ))}

                </tbody>
            </Table>

        </div>
    );
}

