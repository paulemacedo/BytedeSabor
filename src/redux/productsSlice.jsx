import { createSlice } from '@reduxjs/toolkit';
import Produtos from '../back-end/Produtos';
import Acompanhamentos from '../back-end/Acompanhamentos';

const initialState = [...Produtos, ...Acompanhamentos];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export const selectAllProducts = (state) => state.products;

export default productsSlice.reducer;