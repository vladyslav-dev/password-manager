import axios from 'axios';
import { IAuthResponse } from '../types/auth';

export const API_URL = 'http://localhost:5000';

const $api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${API_URL}/api`,
});

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('password-manager:accessToken')}`
  return config;
})

$api.interceptors.response.use((congif) => {
  return congif;
}, async (error) => {
  const originalRequest = error.config;
  console.log(error?.response)
  if (error?.response?.status === 401 && error?.config && !error?.config?._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${API_URL}/api/refresh`, { withCredentials: true })
        console.log(response)
        localStorage.setItem('password-manager:accessToken', response?.data?.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log(e)
        localStorage.removeItem('password-manager:accessToken')
      }
  }
  throw error;
})


export default $api;