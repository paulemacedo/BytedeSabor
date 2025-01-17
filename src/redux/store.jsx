import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import ordersReducer from './ordersSlice';
import loginReducer from './loginSlice';
import registerReducer from './registerSlice';
import passwordRecoveryReducer from './passwordRecoverySlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        orders: ordersReducer,
        login: loginReducer,
        register: registerReducer,
        passwordRecovery: passwordRecoveryReducer,
    },
});

export default store;