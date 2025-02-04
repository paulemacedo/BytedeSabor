import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'login/updateUserProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/usuarios/${userData._id}`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUserProfile = createAsyncThunk(
    'login/deleteUserProfile',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/usuarios/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isLoggedIn: false,
    user: null,
    isAdmin: false,
    error: null,
    profileImage: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isAdmin = false;
            state.error = null;
            state.profileImage = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('profileImage');
        },
        loadUserFromStorage: (state) => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            const profileImage = localStorage.getItem('profileImage');
            if (token && user) {
                state.isLoggedIn = true;
                state.user = user;
                state.isAdmin = isAdmin;
                state.error = null;
                state.profileImage = profileImage;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.isAdmin = action.payload.user.isAdmin;
                state.error = null;
                const profileImage = `src/assets/Img/${action.payload.user.foto}`;
                state.profileImage = profileImage;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('isAdmin', JSON.stringify(action.payload.user.isAdmin));
                localStorage.setItem('profileImage', profileImage);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isAdmin = false;
                state.error = action.payload;
                state.profileImage = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                if (action.payload && action.payload.user) {
                    state.user = action.payload.user;
                    const profileImage = `src/assets/Img/${action.payload.user.foto}`;
                    state.profileImage = profileImage;
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                    localStorage.setItem('profileImage', profileImage);
                }
            })
            .addCase(deleteUserProfile.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isAdmin = false;
                state.error = null;
                state.profileImage = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('profileImage');
            });
    },
});

export const { logout, loadUserFromStorage } = loginSlice.actions;
export const selectUser = (state) => state.login.user;
export default loginSlice.reducer;