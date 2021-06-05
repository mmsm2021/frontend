import axios from "axios";
export const testToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllGU0lUT1RpczVmWUsyTlpURUJsciJ9.eyJodHRwczovL2ZyYW5kaW5lLnJhbmRvbXBocC5jb20vcm9sZXMiOlsiU0EiXSwiaHR0cHM6Ly9mcmFuZGluZS5yYW5kb21waHAuY29tL2FwcF9tZXRhZGF0YSI6eyJsb2NhdGlvbnMiOlsiYTJhYTNhZDItOTAwMC00OTJiLWFiNTItNDU4ZDc0NTU4M2UzIl19LCJodHRwczovL2ZyYW5kaW5lLnJhbmRvbXBocC5jb20vdXNlcl9tZXRhZGF0YSI6eyJsb2NhbGUiOiJlbi1HQiIsInRoZW1lIjoiZGVmYXVsdCJ9LCJuaWNrbmFtZSI6InNhIiwibmFtZSI6InNhQGNsdWIuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzVjY2IyZjZiZjAzZmU3N2RkZWVmZWE4MWNkYmI5ZWIxP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGc2EucG5nIiwidXBkYXRlZF9hdCI6IjIwMjEtMDYtMDVUMTg6MDE6MDUuMTQ2WiIsImVtYWlsIjoic2FAY2x1Yi5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vbW1zbS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjBiNzQ0YTA3N2VjMTkwMDY4MzFhZmNmIiwiYXVkIjoiQnhCdnJUZWJ6TllkOGFRVHpJamFLaUk3Vm1ZdE5RcDMiLCJpYXQiOjE2MjI5MTYwNjYsImV4cCI6MTYyMjk1MjA2Niwibm9uY2UiOiJjV2gyVDBST2QyRk5kRmgzYlRkS1dFUnNRVXhuUzNVdVREaDRNM1U1U1ZSMFFtWTVXVTFSU1M1cGNRPT0iLCJvcmdfaWQiOiJvcmdfV2FwYWFpcXh6amw3NVV2ZCJ9.TjvmnmN-oPoHKZRor_EwRdQZqfN1u2zaMdLL40H_EZt4G3-B4ttarjhRWdHeFhGyAVmy_QAEZif6v5SB3yjcbGKAEPN0yql5GgQOrekGDl7l-4Q8iS-P-sL8q2MvRO2m65vElnlutq9OBJSqyVOSrDwos9C_2IQtXOs8yQ3eCFKnOTkQ9-2fdGsJQDnwnjCdyYUNfSbBjOn-1Wv_sUl1GCOitmIWD8SWLgY3Ai94-d-h1ATufdZ6wwkpTdav-Dk0rr-QByVwvXX21Q96-uZ6FlzRfu1HtahrlG67O7b-R0SV1iRt4Ivy_FsxWcEM3KAqDq0SSVrW_4peS63GDU25Rg";
export const api = axios.create({
    baseURL: 'https://frandine.randomphp.com/api/v1',
    headers:{
        Authorization: `Bearer ${localStorage.getItem('bearer')}`
        // Authorization: `Bearer ${testToken}`
    }
});
export const CoreApi = axios.create({
    baseURL: "https://frandine.randomphp.com/api/v1",
    headers:{
        Authorization: `Bearer ${localStorage.getItem('bearer')}`
    }
});
export const OrderApi = axios.create(
    {
        baseURL: 'https://frandine.randomphp.com/api/v1/orders',
        headers:{
            Authorization: `Bearer ${localStorage.getItem('bearer')}`
        }
    }
)

export const AuthApi = axios.create(
    {
        baseURL: 'https://mmsm.eu.auth0.com/api/v2',
        headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllGU0lUT1RpczVmWUsyTlpURUJsciJ9.eyJpc3MiOiJodHRwczovL21tc20uZXUuYXV0aDAuY29tLyIsInN1YiI6InN5TkFyYjQ5czFkVmJ0bDhZNmt0TmY3ZzBBTFNSNTA2QGNsaWVudHMiLCJhdWQiOiJodHRwczovL21tc20uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2MjI3MjM2OTQsImV4cCI6MTYyMjgxMDA5NCwiYXpwIjoic3lOQXJiNDlzMWRWYnRsOFk2a3ROZjdnMEFMU1I1MDYiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.kogJnlXI6w287Osv8FMYMZI8P-4jXFMr15T6D_-Y0aVRtqoM_Bzl-TkTcbbP6Hjl_erefTI7BNjr7HeDx-0FAac3BziDqX2IIn1MeAWdmmfRNIz18Z6Ivwbo0AR7_K6ClnmNUTGkaZ7rchBMJSI-0-v4OKXupk6mqxp9H5ytGhihY5Mv5HJnnT1MbS_GgKuP5A48OzDbi1FNSvoVDae_bMGdPtR_CkR39Fm1J2OjfOUuwSmdIUW9N92igV2FW4ZEwyzHlvgm_RD7OQ3fHcjUtBKG1BrYyvP3ZO7h_KQUiF0j-dqObR9M_l2vqgXy7AGNhYcFHET7fi0aaG2X_UPQbg`
        }
    }
);
