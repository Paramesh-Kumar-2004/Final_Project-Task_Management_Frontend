import axios from "axios";


export const API = axios.create({
    // baseURL: "http://localhost:2004/api/v1",
    baseURL: "https://final-project-task-management-backe.vercel.app/api/v1",
    withCredentials: true
});

// const baseURL = import.meta.env.DEV
//   ? "http://localhost:2004/api/v1"
//   : "https://final-project-task-management-backe.vercel.app/api/v1";

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
