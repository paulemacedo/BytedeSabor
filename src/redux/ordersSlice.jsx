import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
    },
    reducers: {
        addOrder: (state, action) => {
            state.items.push(action.payload);
        },
        clearOrders: (state) => {
            state.items = [];
        },
        loadOrders: (state) => {
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            state.items = orders;
        },
    },
});

export const { addOrder, clearOrders, loadOrders } = ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.items;

export default ordersSlice.reducer;