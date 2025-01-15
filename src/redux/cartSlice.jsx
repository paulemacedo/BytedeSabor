import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        count: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            state.count = state.items.length;
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        loadCart: (state) => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            state.items = cart;
            state.count = cart.length;
        },
    },
});

export const { addToCart, loadCart } = cartSlice.actions;
export default cartSlice.reducer;