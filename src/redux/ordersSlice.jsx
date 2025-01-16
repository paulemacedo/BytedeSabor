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
                status: 'Pagamento executado com sucesso',
                ...action.payload,
            };
            state.items.push(newOrder);
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