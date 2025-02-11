import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadOrders, loadOrdersByUser, addOrder, updateOrderStatus, deleteOrder } from '../api/orderApi';
import { selectUser } from './loginSlice'; // Importa o seletor de usuário

export const loadOrdersAsync = createAsyncThunk('orders/loadOrders', async () => {
    const pedidos = await loadOrders();
    return pedidos;
});

export const loadOrdersByUserAsync = createAsyncThunk('orders/loadOrdersByUser', async (_, { getState }) => {
    const state = getState();
    const user = selectUser(state); // Obtém o usuário autenticado do estado
    const pedidos = await loadOrdersByUser(user._id);
    return pedidos;
});

export const addOrderAsync = createAsyncThunk('orders/addOrder', async (order, { getState }) => {
    const state = getState();
    const user = selectUser(state); // Obtém o usuário autenticado do estado
    const orderWithUser = { ...order, usuario: user._id }; // Adiciona o ID do usuário ao pedido
    console.log('Dados do pedido a serem enviados:', orderWithUser); // Adiciona log para verificar os dados do pedido
    const pedido = await addOrder(orderWithUser);
    return pedido;
});

export const updateOrderStatusAsync = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, status }) => {
    const pedido = await updateOrderStatus(orderId, status);
    return pedido;
});

export const deleteOrderAsync = createAsyncThunk('orders/deleteOrder', async (orderId) => {
    await deleteOrder(orderId);
    return orderId;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearOrders: (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrdersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadOrdersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loadOrdersByUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrdersByUserAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(loadOrdersByUserAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addOrderAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    if (action.payload.status === 'Cancelado' || action.payload.status === 'Concluído') {
                        state.items.splice(index, 1);
                    } else {
                        state.items[index] = { ...state.items[index], status: action.payload.status };
                    }
                }
            })
            .addCase('login/logout', (state) => {
                state.items = [];
                state.status = 'idle';
                state.error = null;
            })
            .addCase('login/loginSuccess', (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteOrderAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(order => order._id !== action.payload);
            });
    }
});

export const { clearOrders } = ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.items;

export default ordersSlice.reducer;