import axios from "axios";


export const API = axios.create({
    baseURL: "http://localhost:2004/api/v1",
    // baseURL: "https://final-project-task-management-backe.vercel.app/api/v1",
    withCredentials: true
});





