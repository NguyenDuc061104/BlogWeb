// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Thay đổi baseURL phù hợp với server backend của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

// Xử lý request
axiosClient.interceptors.request.use((config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Xử lý response
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Xử lý lỗi
        return Promise.reject(error);
    }
);

export default axiosClient;
