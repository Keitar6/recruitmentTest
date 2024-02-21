import { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from '@mui/material';
import {
  Product,
  fetchProductById,
  fetchProducts,
  selectProductsList,
} from '@store/reducers/products/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
 
const useQuery = () => new URLSearchParams(useLocation().search);

export const useProductsTable = () => {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const { products, status, productsQuantity } = useAppSelector(selectProductsList);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [currentPage, setCurrentPage] = useState(parseInt(query.get('page') || '1', 10));
  const id = query.get('id');

  const totalPages = Math.ceil(productsQuantity / 5);
  const maxProductsForPage = 5;

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

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    navigate(`?page=${newPage}${id ? `&id=${id}` : ''}`);
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
    handleOpen,
    handleClose,
    handleChangePage,
    handleFilterChange,
    id,
  };
};
