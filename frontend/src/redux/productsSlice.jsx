import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProdutos, addProduct, updateProduct, deleteProduct } from '../api/productApi';

export const fetchProdutosAsync = createAsyncThunk(
  'products/fetchProdutos',
  async (_, { rejectWithValue }) => {
    try {
      const produtos = await fetchProdutos();
      return produtos;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const novoProduto = await addProduct(product);
      return novoProduto;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const produtoAtualizado = await updateProduct(product);
      return produtoAtualizado;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
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
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch produtos
      .addCase(fetchProdutosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProdutosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.produtos = action.payload;
      })
      .addCase(fetchProdutosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add produto
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.produtos.push(action.payload);
      })
      // Update produto
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.produtos.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.produtos[index] = action.payload;
        }
      })
      // Delete produto
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.produtos = state.produtos.filter(p => p._id !== action.payload);
      });
  }
});

export const selectAllProducts = (state) => state.products.produtos;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;