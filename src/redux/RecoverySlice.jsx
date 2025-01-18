import { createSlice } from '@reduxjs/toolkit';

const passwordRecoverySlice = createSlice({
    name: 'passwordRecovery',
    initialState: {
        email: '',
        status: 'idle',
        error: null,
    },
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        requestRecovery(state) {
            state.status = 'loading';
        },
        recoverySuccess(state) {
            state.status = 'succeeded';
        },
        recoveryFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        resetState(state) {
            state.email = '';
            state.status = 'idle';
            state.error = null;
        },
    },
});

export const { setEmail, requestRecovery, recoverySuccess, recoveryFailure, resetState } = passwordRecoverySlice.actions;

export default passwordRecoverySlice.reducer;