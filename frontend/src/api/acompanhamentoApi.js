import axios from 'axios';
import { API_URL } from '../config';

export const fetchAcompanhamentos = async () => {
    const response = await axios.get(`${API_URL}/acompanhamentos`);
    return response.data.acompanhamentos;
};

export const addAcompanhamento = async (acompanhamento) => {
    const response = await axios.post(`${API_URL}/acompanhamentos`, acompanhamento);
    return response.data.acompanhamento;
};

export const updateAcompanhamento = async (acompanhamento) => {
    const response = await axios.put(`${API_URL}/acompanhamentos/${acompanhamento._id}`, acompanhamento); // Changed to acompanhamento._id
    return response.data.acompanhamento;
};

export const deleteAcompanhamento = async (id) => {
    const response = await axios.delete(`${API_URL}/acompanhamentos/${id}`);
    return response.data;
};