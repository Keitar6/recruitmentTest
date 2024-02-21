import { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from '@mui/material';
import {
  Product,
  StatusVariants,
  fetchProductById,
  fetchProducts,
  selectProductsList,
} from '@store/reducers/products/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

export type UseProductsTableReturn = {
  products: Product[];
  status: StatusVariants;
  totalPages: number;
  currentPage: number;
  id: string | null;
  open: boolean;
  selectedProduct: Product | null;
  notification: string | null;
  handleOpen: () => void;
  handleClose: () => void;
  handleChangePage: (_event: ChangeEvent<unknown>, page: number) => void;
  handleFilterChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export const useProductsTable = () => {
  const dispatch = useAppDispatch();
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const { products, status, productsQuantity, errorMessage } = useAppSelector(selectProductsList);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [currentPage, setCurrentPage] = useState(parseInt(query.get('page') || '1', 10));
  const id = query.get('id');
  const [notification, setNotification] = useState<string | null>(null);

  const totalPages = Math.ceil(productsQuantity / 5);
  const maxProductsForPage = 5;

  useEffect(() => {
    if (status === 'failed' && errorMessage) {
      setNotification(`Error fetching products: ${errorMessage}`);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [status, errorMessage]);

  useEffect(() => {
    if (id) dispatch<any>(fetchProductById(+id));
    else
      dispatch<any>(
        fetchProducts({
          page: currentPage,
          maxProductsForPage,
        }),
      );
  }, [dispatch, currentPage, id]);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChangePage = (_event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}${id ? `&id=${id}` : ''}`);
  };

  const handleFilterChange = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newId = event.target.value;
      navigate(`/?page=1&id=${newId}`);
    },
    300,
  );

  return {
    products,
    status,
    totalPages,
    currentPage,
    open,
    selectedProduct,
    id,
    notification,
    handleOpen,
    handleClose,
    handleChangePage,
    handleFilterChange,
  };
};
