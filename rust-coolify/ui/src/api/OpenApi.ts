// completed ui_infra_074
import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const OpenApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor: CSRF Token
OpenApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (token && config.headers) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response Interceptor
OpenApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default OpenApi;
