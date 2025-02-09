import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

export const fetchUser = async (userId) => {
    const response = await axios.get(`${API_URL}/usuarios/${userId}`);
    return response.data;
};

export const updateUserProfile = async (userData) => {
    const response = await axios.put(`${API_URL}/usuarios/${userData._id}`, userData);
    return response.data;
};

export const deleteUserProfile = async (userId, token) => {
    const response = await axios.delete(`${API_URL}/usuarios/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};