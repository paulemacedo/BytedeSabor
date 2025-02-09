import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';


const generateHexId = () => {
    return [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            userData._id = generateHexId();
            const response = await axios.post(`${API_URL}/usuarios`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearRegisterState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearRegisterState } = registerSlice.actions;

export default registerSlice.reducer;