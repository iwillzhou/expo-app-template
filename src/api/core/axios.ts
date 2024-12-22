import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    // baseURL: '/api',
    timeout: 30 * 1000
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config;
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    return Promise.reject(response);
});

export { axiosInstance };
