import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkEmailExists, updatePassword } from '../api/userApi';

export const verifyEmailAsync = createAsyncThunk(
    'passwordRecovery/verifyEmail',
    async (email, { rejectWithValue }) => {
        try {
            const response = await checkEmailExists(email);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePasswordAsync = createAsyncThunk(
    'passwordRecovery/updatePassword',
    async ({ email, newPassword }, { rejectWithValue }) => {
        try {
            const response = await updatePassword(email, newPassword);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const recoverySlice = createSlice({
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
    extraReducers: (builder) => {
        builder
            .addCase(verifyEmailAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyEmailAsync.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(verifyEmailAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updatePasswordAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePasswordAsync.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(updatePasswordAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setEmail, requestRecovery, recoverySuccess, recoveryFailure, resetState } = recoverySlice.actions;

export default recoverySlice.reducer;