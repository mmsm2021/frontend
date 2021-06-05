import React, {useState, useEffect } from "react";
import {DataGrid} from "@material-ui/data-grid";
export function CustomDatatable({data}){

    let columns = data[0] && Object.keys(data[0]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data} columns={columns} pageSize={5} checkboxSelection />
        </div>


    );
}

export function AppDT(){
    const [data, setData] = useState([]);
    const [q, setQ] = useState("");
    useEffect(() =>{
        let bearer = localStorage.getItem("bearer");
        fetch("https://frandine.randomphp.com/api/v1/orders/23/last/10",{
            headers:{
                authorization: `Bearer ${bearer}`
            }
        })
            .then(response => response.json())
            .then(json => setData(json.orders));
    },[])
    console.log(data);
    return(
        <div>
            <div>Filters</div>
            <div>
                <CustomDatatable
                    data={data}/>
            </div>
        </div>
    )
}