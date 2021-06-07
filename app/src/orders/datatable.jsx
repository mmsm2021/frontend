import React, {useState, useContext, useEffect } from "react";
import {DataGrid} from "@material-ui/data-grid";
import {Context} from "../configuration/Store";
const [state, dispatch] = useContext(Context);
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
        fetch("https://frandine.randomphp.com/api/v1/orders/23/last/10",{
            headers:{
                authorization: `Bearer ${state.token}`
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
