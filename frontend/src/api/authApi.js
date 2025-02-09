import axios from 'axios';
import { API_URL } from '../config';

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};