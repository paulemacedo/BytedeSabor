import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchAcompanhamentos = createAsyncThunk(
  'acompanhamentos/fetchAcompanhamentos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/acompanhamentos`);
      return response.data.acompanhamentos;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const generateHexId = () => {
  return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const addAcompanhamentoAsync = createAsyncThunk(
  'acompanhamentos/addAcompanhamento',
  async (acompanhamento, { rejectWithValue }) => {
    try {
      product._id = generateHexId(); // Automatically add an ID
      const response = await axios.post(`${API_URL}/acompanhamentos`, acompanhamento);
      return response.data.acompanhamento;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAcompanhamentoAsync = createAsyncThunk(
  'acompanhamentos/updateAcompanhamento',
  async (acompanhamento, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/acompanhamentos/${acompanhamento.id}`, acompanhamento);
      return response.data.acompanhamento;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAcompanhamentoAsync = createAsyncThunk(
  'acompanhamentos/deleteAcompanhamento',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/acompanhamentos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const acompanhamentosSlice = createSlice({
  name: 'acompanhamentos',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcompanhamentos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAcompanhamentos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAcompanhamentos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addAcompanhamentoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAcompanhamentoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAcompanhamentoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(a => a.id !== action.payload);
      });
  }
});

export const selectAllAcompanhamentos = (state) => state.acompanhamentos.items;
export const selectAcompanhamentosStatus = (state) => state.acompanhamentos.status;
export const selectAcompanhamentosError = (state) => state.acompanhamentos.error;

export default acompanhamentosSlice.reducer;