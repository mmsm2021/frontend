import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";

export function GetLast() {
    const {user, getAccessTokenSilently} = useAuth0();
    const bearer = getAccessTokenSilently({
        audience: "https://mmsm.eu.auth0.com/api/v2/",
    });
    console.log(bearer);
    axios.get('https://frandine.randomphp.com/api/v1/orders/23/last/10', {
        headers: {
            Authorization: 'Bearer ' + bearer
        }
    })
        .then(response => console.log(response.data));

}
