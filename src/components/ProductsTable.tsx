import { useEffect, useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  TextField,
  debounce,
  CircularProgress,
} from '@mui/material';
import { Tag } from '@mui/icons-material';

import {
  Product,
  fetchProductById,
  fetchProducts,
  selectProductsList,
} from '@store/reducers/products/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { CustomModal } from './CustomModal';

const useQuery = () => new URLSearchParams(useLocation().search);

const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const { products, status, productsQuantity, totalPageNumber, productsPerPage } =
    useAppSelector(selectProductsList);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
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
          totalPageNumber,
          productsQuantity,
          productsPerPage,
          maxProductsForPage,
        }),
      );
  }, [dispatch, location.search]);

  const handleOpen = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
    navigate(`?page=${newPage}${id ? `&id=${id}` : ''}`);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newId = event.target.value;
    navigate(`/?page=1&id=${newId}`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
        <Tag sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id='input-for-id'
          label='Product id'
          variant='standard'
          type='number'
          color='success'
          defaultValue={id}
          onChange={debounce((e) => handleFilterChange(e), 300)}
          autoFocus
        />
      </Box>

      <TableContainer component={Paper} sx={{ scrollbarWidth: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label='products table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 130 }}>ID</TableCell>
              <TableCell sx={{ width: 342 }}>Name</TableCell>
              <TableCell sx={{ width: 178 }}>Year</TableCell>
            </TableRow>
          </TableHead>
          {status === 'loading' ? (
            <CircularProgress color='success' />
          ) : (
            <TableBody>
              {products.map((product) => {
                const { id, name, year, color } = product;
                return (
                  <TableRow
                    onClick={() => handleOpen(product)}
                    key={id + '-' + name}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: color,
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {id}
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{year}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        color='primary'
        sx={{ marginTop: 2, marginBottom: 2, display: 'flex', justifyContent: 'center' }}
      />

      {selectedProduct ? (
        <CustomModal product={selectedProduct} open={open} onClose={handleClose}>
          <div>''</div>
        </CustomModal>
      ) : null}
    </>
  );
};

export default ProductsTable;
