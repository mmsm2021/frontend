import {useContext} from "react";
import {Context} from "./Store";

let token = null;
let storedToken = localStorage.getItem('token');

const getToken = () => {
    if (token === null && typeof storedToken === 'string') {
        token = storedToken;
    }
    return token;
}

const setToken = (newToken) => {
    token = newToken;
    localStorage.setItem('token', token);
    storedToken = token;
}

export { getToken, setToken };
