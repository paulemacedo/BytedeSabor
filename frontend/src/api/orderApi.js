import axios from 'axios';
import { API_URL } from '../config';

export const loadOrders = async () => {
    const response = await axios.get(`${API_URL}/pedidos`);
    return response.data.pedidos;
};

export const loadOrdersByUser = async (userId) => {
    const response = await axios.get(`${API_URL}/pedidos/usuario/${userId}`);
    return response.data.pedidos;
};

export const addOrder = async (order) => {
    const response = await axios.post(`${API_URL}/pedidos`, order);
    return response.data.pedido;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await axios.put(`${API_URL}/pedidos/${orderId}`, { status });
    return response.data.pedido;
};