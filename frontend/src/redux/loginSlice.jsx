import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser } from '../api/authApi';
import { fetchUser as apiFetchUser, updateUserProfile as apiUpdateUserProfile, deleteUserProfile as apiDeleteUserProfile } from '../api/userApi';

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 semana em milissegundos

export const loginUser = createAsyncThunk(
    'login/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiLoginUser(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'login/updateUserProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiUpdateUserProfile(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUserProfile = createAsyncThunk(
    'login/deleteUserProfile',
    async (userId, { rejectWithValue, getState }) => {
        const state = getState();
        const token = state.login.token;
        try {
            const response = await apiDeleteUserProfile(userId, token);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUser = createAsyncThunk(
    'login/fetchUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiFetchUser(userId);
            return response;
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
    token: localStorage.getItem('token') || null,
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
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('profileImage');
            localStorage.removeItem('userTimestamp');
        },
        loadUserFromStorage: (state) => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
            const profileImage = localStorage.getItem('profileImage');
            const userTimestamp = localStorage.getItem('userTimestamp');
            const now = new Date().getTime();

            if (token && user && userTimestamp && (now - userTimestamp < CACHE_DURATION)) {
                state.isLoggedIn = true;
                state.user = user;
                state.isAdmin = isAdmin;
                state.error = null;
                state.profileImage = profileImage;
                state.token = token;
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
                const now = new Date().getTime();
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('isAdmin', JSON.stringify(action.payload.user.isAdmin));
                localStorage.setItem('profileImage', profileImage);
                localStorage.setItem('userTimestamp', now);
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isAdmin = false;
                state.error = action.payload.message || 'Login failed';
                state.profileImage = null;
                state.token = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                if (action.payload && action.payload.user) {
                    state.user = action.payload.user;
                    const profileImage = `src/assets/Img/${action.payload.user.foto}`;
                    state.profileImage = profileImage;
                    const now = new Date().getTime();
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                    localStorage.setItem('profileImage', profileImage);
                    localStorage.setItem('userTimestamp', now);
                }
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.error = action.payload.message || 'Failed to update user profile';
            })
            .addCase(deleteUserProfile.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isAdmin = false;
                state.error = null;
                state.profileImage = null;
                state.token = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('profileImage');
                localStorage.removeItem('userTimestamp');
            })
            .addCase(deleteUserProfile.rejected, (state, action) => {
                state.error = action.payload.message || 'Failed to delete user profile';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (action.payload && action.payload.data) {
                    state.user = action.payload.data;
                    const profileImage = `src/assets/Img/${action.payload.data.foto}`;
                    state.profileImage = profileImage;
                    const now = new Date().getTime();
                    localStorage.setItem('user', JSON.stringify(action.payload.data));
                    localStorage.setItem('profileImage', profileImage);
                    localStorage.setItem('userTimestamp', now);
                }
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload.message || 'Failed to fetch user';
            });
    },
});

export const { logout, loadUserFromStorage } = loginSlice.actions;
export const selectUser = (state) => state.login.user;
export default loginSlice.reducer;