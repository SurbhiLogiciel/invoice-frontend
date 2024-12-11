import axios, { AxiosResponse } from 'axios';
import { getErrorMessage } from './getErrorMessages';

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    const customMessages = error.config?.meta?.errorMessages;
    const dynamicErrorMessage = getErrorMessage(customMessages);
    const errorMessage = dynamicErrorMessage(status);

    console.error(errorMessage);
    return Promise.reject(error);
  }
);

export default apiClient;
