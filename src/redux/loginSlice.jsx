import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
    isAdmin: false,
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.isAdmin = action.payload.isAdmin;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('isAdmin', JSON.stringify(action.payload.isAdmin));
        },
        loginFailure: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isAdmin = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isAdmin = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
        },
        loadUserFromStorage: (state) => {
            const user = JSON.parse(localStorage.getItem('user'));
            const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            if (user) {
                state.isLoggedIn = true;
                state.user = user;
                state.isAdmin = isAdmin;
                state.error = null;
            }
        },
    },
});

export const { loginSuccess, loginFailure, logout, loadUserFromStorage } = loginSlice.actions;
export default loginSlice.reducer;