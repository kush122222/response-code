import axios from 'axios';

// Set up the base URL for your API
const axiosInstance = axios.create({
  baseURL: 'https://response-code-1.onrender.com',  // Adjust to your backend URL and port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
