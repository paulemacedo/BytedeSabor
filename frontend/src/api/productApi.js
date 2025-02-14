import axios from 'axios';
import { API_URL } from '../config';

export const fetchProdutos = async () => {
    const response = await axios.get(`${API_URL}/produtos`);
    return response.data.produtos;
};

export const addProduct = async (product, token) => {
    const response = await axios.post(`${API_URL}/produtos`, product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.produto;
};

export const updateProduct = async (product, token) => {
    const response = await axios.put(`${API_URL}/produtos/${product._id}`, product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.produto;
};

export const deleteProduct = async (id, token) => {
    const response = await axios.delete(`${API_URL}/produtos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};