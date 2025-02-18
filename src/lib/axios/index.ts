import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;

export default axiosClient;
