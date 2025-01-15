import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        count: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.items.find(item => item.nome === action.payload.nome);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.count = state.items.reduce((sum, item) => sum + item.quantity, 0);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.count = 0;
            localStorage.removeItem('cart');
        },
        loadCart: (state) => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            state.items = cart;
            state.count = cart.reduce((sum, item) => sum + item.quantity, 0);
        },
    },
});

export const { addToCart, clearCart, loadCart } = cartSlice.actions;

export const getTotalPrice = (state) => {
    return state.cart.items.reduce((sum, item) => sum + item.preco * item.quantity, 0).toFixed(2);
};

export default cartSlice.reducer;