import axios from "axios";



const baseURL = import.meta.env.DEV
    ? "http://localhost:2004/api/v1"
    : "https://final-project-task-management-backend-1.onrender.com/api/v1";


const API = axios.create({
    baseURL,
    // "http://localhost:2004/api/v1",
    // baseURL: "https://final-project-task-management-backend-1.onrender.com/api/v1",
    withCredentials: true
});


// 1. Request Interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// 2. Response Interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // window.location.href = '/login';

            const base = window.location.pathname;
            window.location.href = `${base}#/login`;
        }
        return Promise.reject(error);
    }
);

export { API }