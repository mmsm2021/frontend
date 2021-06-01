import axios from 'axios';
import {useAuth0} from "@auth0/auth0-react";
export const testToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllGU0lUT1RpczVmWUsyTlpURUJsciJ9.eyJodHRwczovL2ZyYW5kaW5lLnJhbmRvbXBocC5jb20vcm9sZXMiOlsiU0EiXSwiaHR0cHM6Ly9mcmFuZGluZS5yYW5kb21waHAuY29tL2FwcF9tZXRhZGF0YSI6eyJjb21wb25lbnRzIjpbIm9yZGVycyIsImludmVudG9yeSJdfSwiaHR0cHM6Ly9mcmFuZGluZS5yYW5kb21waHAuY29tL3VzZXJfbWV0YWRhdGEiOnsibG9jYWxlIjoiZW4tR0IiLCJzZXR0aW5ncyI6eyJsb2NhbGUiOiJkYSJ9LCJ0aGVtZSI6ImRlZmF1bHQifSwibmlja25hbWUiOiJtYXJrMzIwNyIsIm5hbWUiOiJNYXJrMzIwNyIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9hZmU1ZDJmNjdkZTQzZTg2ZmZlZjdhYzU2NjEwODJiYj9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRm1hLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIxLTA1LTI5VDEyOjQzOjUyLjI4NFoiLCJlbWFpbCI6Im1hcmszMjA3QGVkdS5zZGUuZGsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vbW1zbS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjA5M2M5YmJhMjkwOGIwMDZhOGYzMGIzIiwiYXVkIjoiQnhCdnJUZWJ6TllkOGFRVHpJamFLaUk3Vm1ZdE5RcDMiLCJpYXQiOjE2MjI1MjkyNTYsImV4cCI6MTYyMjU2NTI1Niwibm9uY2UiOiJOMGhwY2pSd1ZDMDNPRFpWVTE5elJqRmlaV3RYU1c1amRrdFNSMGh3YkhKV2VURmxjMk5SVjJKK2JBPT0ifQ.K5sNSGoxj5wBKcFHh7kY85d9UDPNG1V8Rbk0r0Kd_zCB1TpSkAJtFmeIMcOOS0z5j7Z0iaZEYT0-KGXf75fDf9nLRLcsKA9OnVUcz8fIRC8cTuXjhMPHvxB5nFu7qMM7uSHgUNN_ZiAR-J7fhKxEJyQTfNQa4pMSWoPmSc1BO-gO94qtCbO27vVGjRmu4TVkNvtopSEuasroX2j_c69sjW37PK2p2YIlyHvdLDvuvWcKvfH6UR0or1F3R_z0aVLkW584eGR-jy8yBqjUhtjepwe-iGQVjCCHCrNQsdR9aCn3i8InHfDT-nYfunsSZipNa3-YiNI4OqYy-AMuBf5D4w";
export const api = axios.create({
    baseURL: "https://frandine.randomphp.com/api/v1",
    headers:{
        Authorization: `Bearer ${localStorage.getItem('bearer')}`
        // Authorization: `Bearer ${testToken}`
    }
});

export const OrderApi = async (path) =>{

}

export const AuthApi = axios.create(
    {
        baseURL: 'https://mmsm.eu.auth0.com/api/v2',
        headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllGU0lUT1RpczVmWUsyTlpURUJsciJ9.eyJpc3MiOiJodHRwczovL21tc20uZXUuYXV0aDAuY29tLyIsInN1YiI6InN5TkFyYjQ5czFkVmJ0bDhZNmt0TmY3ZzBBTFNSNTA2QGNsaWVudHMiLCJhdWQiOiJodHRwczovL21tc20uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2MjIyMTE3MjMsImV4cCI6MTYyMjI5ODEyMywiYXpwIjoic3lOQXJiNDlzMWRWYnRsOFk2a3ROZjdnMEFMU1I1MDYiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.DqxE9d4sQJgOJOqbBh2wdmWA6L8FLbLvL0V54nbioqbvtjLDZBbLfC-YiF3pm_QDecMGv6SvGf6sM1EMePl0AlinoVDNvW8o-rjq9OIYR3GOSL_T-1w0IGEjHX0lWhtWdDkxrgLuptE5Ufn1KrHt0Tsu_JKH-d55OuV_TpRdGvMRVZOPMXDMuKpWiu2_xoeIubCCd7-iaFVluxdSCtxaRn6LQbgwSbgkqH8hj1OT4Ft8G3ygsTnMsxgysrR4Ys5a7uOXdZk33g4tFcgjfgiT93LhSuD_yIFtFuCuOyTl9mb2J8fUVbHoO5N2aCrDNaBYG_mIx8soGtfis1d1O1yAXQ`
        }
    }
);
