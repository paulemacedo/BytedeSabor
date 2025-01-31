import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';
import loginReducer from './loginSlice';
import registerReducer from './registerSlice';
import passwordRecoveryReducer from './RecoverySlice.jsx';
import productsReducer from './productsSlice.jsx';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        orders: ordersReducer,
        login: loginReducer,
        register: registerReducer,
        passwordRecovery: passwordRecoveryReducer,
        products: productsReducer,
    },
});

export default store;