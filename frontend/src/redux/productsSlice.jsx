import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchProdutos = createAsyncThunk(
  'products/fetchProdutos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/produtos`);
      return response.data.produtos;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/produtos`, product);
      return response.data.produto;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/produtos/${product._id}`, product);
      return response.data.produto;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/produtos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    produtos: [],
    acompanhamentos: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch produtos
      .addCase(fetchProdutos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProdutos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.produtos = action.payload;
      })
      .addCase(fetchProdutos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add produto
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.produtos.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.produtos.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.produtos[index] = action.payload;
        }
      })
      
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.produtos = state.produtos.filter(p => p._id !== action.payload);
      });
  }
});

export const selectAllProducts = (state) => state.products.produtos;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;