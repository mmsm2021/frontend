import {JWTParser} from "../services/JWTParser";

const Reducer =(state, action) =>{
    switch (action.type){
        case 'SET_LOCATION':
            return{
                ...state,
                location: action.payload
            };
        case 'SET_THEME':
            return{
                ...state,
                theme: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'SET_LOCALE':
            return {
                ...state,
                locale: action.payload
            };

        default:
            return state;
    }
};
export default Reducer;
