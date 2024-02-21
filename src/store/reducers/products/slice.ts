import type { RootState } from '@store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Product = { id: 2; name: string; year: 2001; color: string; pantone_value: string };

type ProductState = {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ProductState = {
  products: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (page: number) => {
  const baseProductsApiURL = 'https://reqres.in/api';
  const response = await axios.get(baseProductsApiURL + `/products?page=${page}`);
  return response.data;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProductsList = (state: RootState) => state.products;
