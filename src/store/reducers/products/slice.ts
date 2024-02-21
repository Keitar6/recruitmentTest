import type { RootState } from '@store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseProductsApiURL = 'https://reqres.in/api';

export type StatusVariants = 'idle' | 'loading' | 'failed';

type DataFromApi = {
  data: Product[];
  status: StatusVariants;
  per_page: number;
  total_pages: number;
  total: number;
};

export type Product = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export type ProductState = {
  products: Product[];
  status: StatusVariants;
  totalPageNumber: number;
  productsQuantity: number;
  productsPerPage: number;
};

const initialState: ProductState = {
  products: [],
  status: 'idle',
  totalPageNumber: 0,
  productsQuantity: 0,
  productsPerPage: 0,
};

type FetchProductsProps = {
  page: number;
  maxProductsForPage: number;
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, maxProductsForPage }: FetchProductsProps) => {
    const apiData: DataFromApi = (await axios.get(baseProductsApiURL + `/products?page=${page}`))
      .data;

    const productsForPage: Product[] = [];
    const { total } = apiData;
    const initProdNumberForPage = (page ? maxProductsForPage * (page - 1) : 0) + 1;
    const lastItemNumberForPage =
      maxProductsForPage * page > total ? total : maxProductsForPage * page;

    // I know that there might be a lot of calls but this api does not support pagination
    // and in tasks remarks there was a remark about use api pagination.
    // I probably would do this by downloading pages but this would add some logic. I think that this is the closest one for this remark.
    for (let index = initProdNumberForPage; index <= lastItemNumberForPage; index++) {
      productsForPage.push(
        (await axios.get(baseProductsApiURL + `/products?id=${index}`)).data.data,
      );
    }

    return { ...apiData, data: productsForPage };
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: number) =>
    (await axios.get(baseProductsApiURL + `/products?id=${id}`)).data as { data: Product },
);

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
        const { total, per_page, total_pages, data } = action.payload;
        state.status = 'idle';
        state.products = data;
        state.productsPerPage = per_page;
        state.productsQuantity = total;
        state.totalPageNumber = total_pages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.status = 'idle';
        state.products = [data];
        state.productsQuantity = 1;
        state.totalPageNumber = 1;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const productsReducer = productsSlice.reducer;

export const selectProductsList = (state: RootState) => state.products;
