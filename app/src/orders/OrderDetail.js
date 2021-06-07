import {useContext, useEffect, useState} from "react";
import {Context} from "../configuration/Store";
import {TestApi} from "../services/ApiService";

export const OrderDetail = (id) =>{
    const [state,dispatch] = useContext(Context);
    const [init,setInit] = useState([]);
    useEffect(async () =>{
        await TestApi(state.token).get(`/order/${id}`).then(
            res => setInit(res.data)
        ).catch(err => dispatch({type:'SET_ERROR',payload:err}));
    },[]);
    console.log(init);
    return(
        <p>{init.length}</p>
    )
}
