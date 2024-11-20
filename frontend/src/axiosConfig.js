import axios from 'axios';

// Set up the base URL for your API
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5003',  // Adjust to your backend URL and port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
