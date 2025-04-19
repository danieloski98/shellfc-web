import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://shellfc-servicer-production.up.railway.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        // If token exists, add it to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            // Clear token from localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
            }
            // You might want to redirect to login page or handle the unauthorized state
        }

        return Promise.reject(error);
    }
);

export default httpClient; 