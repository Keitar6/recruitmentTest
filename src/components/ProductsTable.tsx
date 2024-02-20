import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { fetchProducts, selectProductsList } from '@store/reducers/products/slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(selectProductsList);

  useEffect(() => {
    dispatch<any>(fetchProducts(1));
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching products.</p>;

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
          {products.map(({ id, name, year, color }) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: color }}
            >
              <TableCell component='th' scope='row'>
                {id}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{year}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
