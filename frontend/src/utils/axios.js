import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Update with your backend URL
  timeout: 5000, // Optional timeout for requests
});

export default axiosInstance;
