// api.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your base URL
  // You can also set other default configurations here
});

export default api;
