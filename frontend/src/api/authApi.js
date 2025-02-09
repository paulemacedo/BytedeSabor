import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};