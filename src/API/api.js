import axios from "axios";


export const API = axios.create({
    // baseURL: "http://localhost:2004/api/v1",
    baseURL: "http://10.112.18.238:5173/api/v1",
    withCredentials: true
});


