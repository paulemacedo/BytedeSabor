import axios from 'axios';
import { API_URL } from '../config';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/usuarios`, userData);
    return response.data;
};

export const checkEmailExists = async (email) => {
    const response = await axios.post(`${API_URL}/usuarios/check-email`, { email });
    return response.data;
};

export const updatePassword = async (email, newPassword) => {
    const response = await axios.put(`${API_URL}/usuarios/update-password`, { email, newPassword });
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