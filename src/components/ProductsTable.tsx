import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Product, fetchProducts, selectProductsList } from '@store/reducers/products/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { CustomModal } from './CustomModal';

const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(selectProductsList);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  useEffect(() => {
    dispatch<any>(fetchProducts(1));
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching products.</p>;

  const handleOpen = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='products table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            const { id, name, year, color } = product;
            return (
              <TableRow
                onClick={() => handleOpen(product)}
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: color }}
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
      </Table>
      {selectedProduct ? (
        <CustomModal product={selectedProduct} open={open} onClose={handleClose}>
          <div>'elo'</div>
        </CustomModal>
      ) : null}
    </TableContainer>
  );
};

export default ProductsTable;
