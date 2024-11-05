import axios, { AxiosResponse } from 'axios';
import { getErrorMessage } from './getErrorMessages';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    const customMessages = error.config?.meta?.errorMessages;

    const dynamicErrorMessage = getErrorMessage(customMessages);
    const errorMessage = dynamicErrorMessage(status);

    console.error(errorMessage);
    return Promise.reject(error);
  }
);
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
export default apiClient;
