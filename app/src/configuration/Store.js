import React, {createContext, useReducer} from "react";
import Reducer from "./Reducer";

const initialState ={
    locale: 'en',
    location:{
        id: 'a2aa3ad2-9000-492b-ab52-458d745583e3'
    },
    theme:'light',
    user:{
        bearer:''
    },
    error:null
};
const Store = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, initialState);
    return(
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};
export const Context = createContext(initialState);
export default Store;
