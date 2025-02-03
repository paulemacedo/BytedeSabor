import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks para buscar dados do backend
export const fetchProdutos = createAsyncThunk('products/fetchProdutos', async () => {
  const response = await axios.get('/api/produtos');
  return response.data;
});

export const fetchAcompanhamentos = createAsyncThunk('products/fetchAcompanhamentos', async () => {
  const response = await axios.get('/api/acompanhamentos');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    produtos: [],
    acompanhamentos: []
  },
  reducers: {
    addProduct: (state, action) => {
      state.produtos.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.produtos.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.produtos[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.produtos = state.produtos.filter(product => product.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdutos.fulfilled, (state, action) => {
        state.produtos = action.payload;
      })
      .addCase(fetchAcompanhamentos.fulfilled, (state, action) => {
        state.acompanhamentos = action.payload;
      });
  }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export const selectAllProducts = (state) => state.products.produtos;
export const selectAllAcompanhamentos = (state) => state.products.acompanhamentos;

export default productsSlice.reducer;