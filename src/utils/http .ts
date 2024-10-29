// src/api/apiClient.ts
import axios, { AxiosResponse } from 'axios';
import { getErrorMessage } from './getErrorMessages';

const BASE_URL = process.env.REACT_APP_BASE_URL; // Fetching the base URL from environment variables

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for handling responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    const customMessages = error.config?.meta?.errorMessages;

    const dynamicErrorMessage = getErrorMessage(customMessages);
    const errorMessage = dynamicErrorMessage(status);

    console.error(errorMessage); // Log the error message for debugging
    return Promise.reject(error); // Reject the promise to be handled in the calling code
  }
);

export default apiClient;
