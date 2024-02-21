import { vi } from 'vitest';
// import { act, renderHook } from '@testing-library/react';
// import * as reactRouterDom from 'react-router-dom';

// import * as reduxHooks from '@store/hooks';
// import { useProductsTable } from './';

describe('useProductsTable', () => {
  beforeEach(() => {
    vi.mock('@store/hooks', () => ({
      useAppDispatch: vi.fn(),
      useAppSelector: vi.fn(() => ({
        products: [],
        status: 'idle',
        totalPages: 0,
        currentPage: 1,
        productsQuantity: 0,
      })),
    }));

    vi.mock('react-router-dom', () => ({
      useLocation: vi.fn().mockReturnValue({
        pathname: '/',
        search: '?page=1',
        hash: '',
        state: null,
        key: 'default',
      }),
      useNavigate: vi.fn(),
    }));
  });

  it('fetches products on initial render', () => {});
  //   it('fetches products on initial render', async () => {
  //     const mockFetchProducts = vi.fn();
  //     vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(mockFetchProducts);

  //     renderHook(() => useProductsTable());

  //     expect(mockFetchProducts).toHaveBeenCalled();
  //   });

  //   it('handles pagination change', async () => {
  //     const navigate = vi.fn();
  //     vi.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(navigate);

  //     const { result } = renderHook(() => useProductsTable());

  //     act(() => {
  //       result.current.handleChangePage({} as any, 2);
  //     });

  //     expect(navigate).toHaveBeenCalledWith('?page=2');
  //   });
});
