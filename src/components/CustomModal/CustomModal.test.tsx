import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomModal, CustomModalProps } from '.';

describe('CustomModal', () => {
  const productMock = {
    id: 1,
    name: 'Test Product',
    year: 2021,
    color: 'red',
    pantone_value: '17-1456',
  };
  const Item = (props: CustomModalProps) => <CustomModal {...props} />;

  it('renders without crashing', () => {
    render(Item({ product: productMock, open: true }));
    expect(screen.getByText(/All you need to know about/i)).toBeInTheDocument();
  });

  it('is visible when open prop is true', () => {
    const { getByTestId } = render(Item({ product: productMock, open: true }));
    expect(getByTestId('dialog')).toBeVisible();
  });

  it('is not visible when open prop is false', () => {
    const { queryByTestId } = render(Item({ product: productMock, open: false }));
    expect(queryByTestId('dialog')).not.toBeInTheDocument();
  });
});
