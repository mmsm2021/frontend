import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FaInfo} from "react-icons/all";
import React from "react";
import mockdata from "./mockOrders.json";
import {api, testToken} from "../services/ApiService";
import {Alerter} from "../services/AlertService";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {withAuth0} from "@auth0/auth0-react";

const columns = [

    {
        field: 'orderDate',
        headerName: 'Order Date',
        width: 210,
        valueFormatter: (params) => params.value = new Date(params.value).toDateString(),
    },
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
        field: 'orderId',

        renderCell: (params) =>(
            <Link to={`/orders/${params.value}`}>
                    <FaInfo/>
            </Link>
        )

    },

];
class OrderTable extends React.Component{
    state={
        data: [],
        status: "",
        isLoading: true,
        error:null

    }
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (!this.props.useMockdata){
            this.getOrders();

        }else {
            this.setState({data: mockdata, isLoading: false});;
        }
    }

    getOrders(){
        api.get(`/orders/${this.props.id}/last/100`)
            .then(res =>{
            console.log(res);
            this.setState({data: res.data, isLoading: false});
        })
            .catch(err => {
                console.log(err.message);
                this.setState({status: err.message})
            });
    }
    render() {
        const {user} = this.props.auth0;
        const {data, status, isLoading,error} = this.state;
        if (status && !this.props.useMockdata) {
            console.log(status);
            return <Alerter message={status} type={"error"}/>;
        }
        if (isLoading) return <Alerter message={"Loading data..."} type={"success"}/>;
        if (error) return <Alerter message={error.message} type={"error"} title={`Code: ${error.code}`}/>;
        return (
            <div style={{ height: 800, width: '100%' }}>
                <DataGrid rows={data.orders}
                          columns={columns}
                          pageSize={5}
                          getRowId={(row)=> row.orderId}
                          components={
                              {
                                  Toolbar: GridToolbar
                              }
                          }

                />
            </div>
        );
    }

} export default withAuth0(OrderTable)
