import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchProdutos = async () => {
    const response = await axios.get(`${API_URL}/produtos`);
    return response.data.produtos;
};

export const addProduct = async (product) => {
    const response = await axios.post(`${API_URL}/produtos`, product);
    return response.data.produto;
};

export const updateProduct = async (product) => {
    const response = await axios.put(`${API_URL}/produtos/${product._id}`, product);
    return response.data.produto;
};

export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/produtos/${id}`);
    return response.data;
};