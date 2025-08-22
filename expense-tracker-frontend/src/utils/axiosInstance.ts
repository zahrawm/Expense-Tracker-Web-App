import axios from  'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept:'application/json'
    },
});

 axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
         if (error.response && error.response.status === 401) {
            console.error("Unauthorized access - redirecting to login");
            localStorage.removeItem('token'); 
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
