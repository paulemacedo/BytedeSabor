import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
    },
    reducers: {
        addOrder: (state, action) => {
            const newOrder = {
                id: uuidv4(),
                status: 'Aguardando Confirmação',
                ...action.payload,
            };
            state.items.push(newOrder);
        },
        syncToStorage: (state) => {
            localStorage.setItem('orders', JSON.stringify(state.items));
        },
        clearOrders: (state) => {
            state.items = [];
            localStorage.setItem('orders', JSON.stringify(state.items));
        },
        loadOrders: (state) => {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            state.items = orders;
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.items.find(order => order.id === orderId);
            if (order) {
                order.status = status;
                localStorage.setItem('orders', JSON.stringify(state.items));
            }
        },
    },
});

export const { addOrder, clearOrders, loadOrders, updateOrderStatus } = ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.items;

export default ordersSlice.reducer;