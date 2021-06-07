import React, {createContext, useReducer} from "react";
import Reducer from "./Reducer";

const initialState ={
    locale: 'da',
    location:{
        id: localStorage.getItem('locId'), // Default location
        metadata: {
            branding:{
                logo_url:'',
                colors:{
                    primary:'',
                    page_background:''
                }
            }
        }
    },
    theme:'light',
    user:null,
    error:null,
    didChange: false

};
const Store = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, initialState);
    console.log(localStorage.getItem('locId'));
    console.log(localStorage.getItem('bearer'));
    return(
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};
export const Context = createContext(initialState);
export default Store;
