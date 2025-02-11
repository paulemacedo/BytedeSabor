import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAcompanhamentos, addAcompanhamento, updateAcompanhamento, deleteAcompanhamento } from '../api/acompanhamentoApi';

export const fetchAcompanhamentosAsync = createAsyncThunk(
  'acompanhamentos/fetchAcompanhamentos',
  async (_, { rejectWithValue }) => {
    try {
      const acompanhamentos = await fetchAcompanhamentos();
      return acompanhamentos;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addAcompanhamentoAsync = createAsyncThunk(
  'acompanhamentos/addAcompanhamento',
  async (acompanhamento, { rejectWithValue }) => {
    try {
      const novoAcompanhamento = await addAcompanhamento(acompanhamento);
      return novoAcompanhamento;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateAcompanhamentoAsync = createAsyncThunk(
  'acompanhamentos/updateAcompanhamento',
  async (acompanhamento, { rejectWithValue }) => {
    try {
      const acompanhamentoAtualizado = await updateAcompanhamento(acompanhamento);
      return acompanhamentoAtualizado;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAcompanhamentoAsync = createAsyncThunk(
  'acompanhamentos/deleteAcompanhamento',
  async (id, { rejectWithValue }) => {
    try {
      await deleteAcompanhamento(id);
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
      .addCase(fetchAcompanhamentosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAcompanhamentosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAcompanhamentosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addAcompanhamentoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAcompanhamentoAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAcompanhamentoAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(a => a._id !== action.payload);
      });
  }
});

export const selectAllAcompanhamentos = (state) => state.acompanhamentos.items;
export const selectAcompanhamentosStatus = (state) => state.acompanhamentos.status;
export const selectAcompanhamentosError = (state) => state.acompanhamentos.error;

export default acompanhamentosSlice.reducer;