import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearRegisterState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { registerRequest, registerSuccess, registerFailure, clearRegisterState } = registerSlice.actions;

export default registerSlice.reducer;