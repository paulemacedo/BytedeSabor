import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        orders: ordersReducer,
    },
});

export default store;