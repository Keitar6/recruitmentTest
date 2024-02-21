import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

import * as useProductsTableModule from '@utils/hooks/useProductsTable'; // Adjust the import path as needed
import { Product } from '@store/reducers/products/slice';
import ProductsTable from './';

const mockProducts: Product[] = [
  { id: 1, name: 'Product 1', year: 2021, color: 'red', pantone_value: '123' },
  { id: 2, name: 'Product 2', year: 2022, color: 'blue', pantone_value: '121233' },
];

const mockUseProductsTable: useProductsTableModule.UseProductsTableReturn = {
  products: mockProducts,
  status: 'idle',
  totalPages: 1,
  currentPage: 1,
  open: false,
  selectedProduct: null,
  handleOpen: vi.fn(),
  handleClose: vi.fn(),
  handleChangePage: vi.fn(),
  handleFilterChange: vi.fn(),
  id: '',
};

describe('ProductsTable', () => {
  beforeEach(() => {
    vi.spyOn(useProductsTableModule, 'useProductsTable').mockReturnValue(
      mockUseProductsTable as any,
    );
  });

  it('renders products correctly', () => {
    render(<ProductsTable />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    vi.spyOn(useProductsTableModule, 'useProductsTable').mockReturnValue({
      ...mockUseProductsTable,
      status: 'loading',
    } as any);
    render(<ProductsTable />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('opens CustomModal when a product is selected', () => {
    vi.spyOn(useProductsTableModule, 'useProductsTable').mockReturnValue({
      ...mockUseProductsTable,
      selectedProduct: mockProducts[0],
      open: true,
    } as any);
    render(<ProductsTable />);
    expect(screen.getByText(/All you need to know about/i)).toBeInTheDocument();
  });
});
