import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import { FaTable} from "react-icons/all";
import React from "react";
import {AppDT, CustomDatatable} from "../orders/datatable";
import {Container} from "react-bootstrap";
import {DataGrid} from "@material-ui/data-grid";

export const BookingRoutes =[
    {
        path: "/booking",
        exact: true,
        sidebar: <Link to="/booking"><FormattedMessage id={"booking"}/></Link>,
        main: () => <div>Choose action from the menu</div>
    },
    {
        path: "/booking/scheduled",
        sidebar: <Link to="/booking/scheduled"><FormattedMessage id={"scheduled"}/></Link>,
        main: () => <Scheduled/>
    }
]
export const Booking = () =>{
    return(
        <Menu iconShape={"circle"}>
        <SubMenu title={<FormattedMessage id={"bookings"}/>}
                 icon={<FaTable/>}>
            {BookingRoutes.map((route, index) => (

                <MenuItem key={index}>
                    <Link to={route.path}>{route.sidebar}</Link>
                </MenuItem>
            ))}

        </SubMenu>
        </Menu>
    )
}
const mockdata =[
    {
    id: 1,
    table: 8,
    partyOf: 2,
    preOrders:[],
    customer: null,
    date: Date.now()
    },    {
    id: 2,
    table: 1,
    partyOf: 3,
    preOrders:[],
    customer: null,
    date: Date.now()
    },    {
    id: 3,
    table: 6,
    partyOf: 10,
    preOrders:[],
    customer: null,
    date: Date.now()
    },    {
    id: 4,
    table: 2,
    partyOf: 2,
    preOrders:["fries","rosé"],
    customer: null,

    date: Date.now()
    },
]
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'table', headerName: 'Table #', width: 150 },
    { field: 'partyOf', headerName: 'Party of #', width: 150 },
    {
        field: 'preOrders',
        headerName: 'Pre-Orders',
        type: 'string',
        width: 120,
    },
    {
        field: 'customer',
        headerName: 'Customer',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        // valueGetter: (params) =>
        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //         params.getValue(params.id, 'lastName') || ''
        //     }`,
    },
    {
        field: 'date',
        headerName: 'Booking Date',
        type: 'date',
        width: 'auto'
    },
];
const Scheduled = () =>{
    let reservations = mockdata;
    let colDef = reservations[0] && Object.keys(reservations[0]);


    return(

            <div style={{ height: 400, width: '100%' }}>
            <h2>Scheduled bookings</h2>
                <DataGrid rows={reservations} columns={columns} pageSize={5} checkboxSelection />
            </div>

            )
}
