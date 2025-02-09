import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/usuarios`, userData);
    return response.data;
};