import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";

export const api = axios.create({
    baseURL: "https://frandine.randomphp.com/api/v1",
    headers:{
        Authorization: `Bearer ${localStorage.getItem('bearer')}`
    }
});


