import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { productsReducer, fetchProducts, fetchProductById, ProductState } from './slice';

const mock = new MockAdapter(axios);
const baseProductsApiURL = 'https://reqres.in/api';

const mockProductData = {
  id: 1,
  name: 'Test Product',
  year: 2021,
  color: 'red',
  pantone_value: '17-1456',
};
const mockProductsResponse = {
  data: [mockProductData],
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
};

describe('productsReducer', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should return the initial state', () => {
    expect(productsReducer(undefined, { type: '' })).toEqual({
      products: [],
      status: 'idle',
      totalPageNumber: 0,
      productsQuantity: 0,
      productsPerPage: 0,
      errorMessage: null,
    } as ProductState);
  });

  it('handles fetchProducts/pending action', () => {
    const action = { type: fetchProducts.pending.type };
    const initialState = undefined;
    const expectedState: ProductState = {
      products: [],
      status: 'loading',
      totalPageNumber: 0,
      productsQuantity: 0,
      productsPerPage: 0,
      errorMessage: null,
    };
    expect(productsReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles fetchProducts/fulfilled action', async () => {
    mock.onGet(`${baseProductsApiURL}/products?id=1`).reply(200, { data: mockProductData });
    mock.onGet(`${baseProductsApiURL}/products?id=2`).reply(200, { data: mockProductData });
    mock.onGet(`${baseProductsApiURL}/products?id=3`).reply(200, { data: mockProductData });
    mock.onGet(`${baseProductsApiURL}/products?id=4`).reply(200, { data: mockProductData });
    mock.onGet(`${baseProductsApiURL}/products?id=5`).reply(200, { data: mockProductData });
    mock.onGet(`${baseProductsApiURL}/products?page=1`).reply(200, mockProductsResponse);

    const store = configureStore({ reducer: { products: productsReducer } });

    await store.dispatch(
      fetchProducts({
        page: 1,
        maxProductsForPage: 5,
      }),
    );

    const state = store.getState().products;
    expect(state.status).toBe('idle');
    expect(state.products).toHaveLength(5);
    expect(state.totalPageNumber).toBe(mockProductsResponse.total_pages);
  });

  it('handles fetchProducts/rejected action', async () => {
    mock.onGet(`${baseProductsApiURL}/products?page=1`).networkError();

    const store = configureStore({ reducer: { products: productsReducer } });

    await store.dispatch(
      fetchProducts({
        page: 1,
        maxProductsForPage: 5,
      }),
    );

    const state = store.getState().products;
    expect(state.status).toBe('failed');
  });

  it('handles fetchProductById/pending action', () => {
    const action = { type: fetchProductById.pending.type };
    const initialState = undefined;
    const expectedState: ProductState = {
      products: [],
      status: 'loading',
      totalPageNumber: 0,
      productsQuantity: 0,
      productsPerPage: 0,
      errorMessage: null,
    };
    expect(productsReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles fetchProductById/fulfilled action', async () => {
    mock.onGet(`${baseProductsApiURL}/products?id=1`).reply(200, { data: mockProductData });

    const store = configureStore({ reducer: { products: productsReducer } });

    await store.dispatch(fetchProductById(1));

    const state = store.getState().products;
    expect(state.products).toEqual([mockProductData]);
    expect(state.status).toBe('idle');
    expect(state.productsQuantity).toBe(1);
    expect(state.totalPageNumber).toBe(1);
  });

  it('handles fetchProductById/rejected action', async () => {
    mock.onGet(`${baseProductsApiURL}/products?id=999`).reply(404);

    const store = configureStore({ reducer: { products: productsReducer } });

    await store.dispatch(fetchProductById(999));

    const state = store.getState().products;
    expect(state.status).toBe('failed');
    expect(state.products).toEqual([]);
    expect(state.productsQuantity).toBe(0);
    expect(state.totalPageNumber).toBe(0);
  });
});
