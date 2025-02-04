import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectUser } from './loginSlice'; // Importa o seletor de usuário

const API_URL = 'http://localhost:3001/api';

export const loadOrders = createAsyncThunk('orders/loadOrders', async () => {
    const response = await axios.get(`${API_URL}/pedidos`);
    return response.data.pedidos;
});

export const loadOrdersByUser = createAsyncThunk('orders/loadOrdersByUser', async (_, { getState }) => {
    const state = getState();
    const user = selectUser(state); // Obtém o usuário autenticado do estado
    const response = await axios.get(`${API_URL}/pedidos/usuario/${user._id}`);
    return response.data.pedidos;
});

export const addOrder = createAsyncThunk('orders/addOrder', async (order, { getState }) => {
    const state = getState();
    const user = selectUser(state); // Obtém o usuário autenticado do estado
    const orderWithUser = { ...order, usuario: user._id }; // Adiciona o ID do usuário ao pedido
    console.log('Dados do pedido a serem enviados:', orderWithUser); // Adiciona log para verificar os dados do pedido
    const response = await axios.post(`${API_URL}/pedidos`, orderWithUser);
    return response.data.pedido;
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, status }) => {
    const response = await axios.put(`${API_URL}/pedidos/${orderId}`, { status });
    return response.data.pedido;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loadOrdersByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrdersByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadOrdersByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    }
});

export const selectAllOrders = (state) => state.orders.items;

export default ordersSlice.reducer;