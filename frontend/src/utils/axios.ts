// Custom axios instance

import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
