import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: process.env.NODE_ENV === 'production' || process.env.GITHUB_ACTIONS ? 60000 : 180000,
});

export default httpClient;
