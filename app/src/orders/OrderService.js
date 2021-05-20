import {Table} from "react-bootstrap";
import React from "react";

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

export function GetOrders() {
    try {
        const response = fetch('https://frandine.randomphp.com/api/orders/23/last/3');
        const json = response.json();
        return ConvertJson(json);
    } catch (err) {
        throw err;
        console.log(err);
    }
}

export function GetOrder(props) {
    console.log("Getting Order: ", props.id);
    let retVal;
    fetch('https://frandine.randomphp.com/api/orders/' + props.id)
        .then(response => response.json())
        .then(data =>
            retVal = ConvertJson(data.orders));
    return retVal;
}


export class OrderTable extends React.Component {

    render() {
        if (this.props.isLoading) {
            return <div>Loading...</div>;
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
                    {this.props.orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.orderId}</td>
                            <td>{order.orderDate["date"]}</td>
                            <td>{order.customer}</td>
                            <td>{order.server}</td>
                            <td>{order.items.length}</td>
                        </tr>
                    ))}

                    </tbody>
                </Table>

            </div>
        );
    }
}
