import { API_BASE_URL } from '@/constants';
import axios from 'axios';

export const apiClient = axios.create({ baseURL: API_BASE_URL, withCredentials: true });
