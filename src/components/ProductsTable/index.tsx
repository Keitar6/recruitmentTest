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
  Snackbar,
} from '@mui/material';
import { Tag } from '@mui/icons-material';

import { CustomModal } from '../CustomModal';
import { useProductsTable } from '@utils/hooks/useProductsTable';

const ProductsTable = () => {
  const {
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
  } = useProductsTable();

  return (
    <>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={6000}
        onClose={(_event: any, reason: any) => {
          if (reason === 'clickaway') {
            return;
          }
        }}
        message={notification}
      />

      <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 1 }}>
        <Tag sx={{ mr: 1, my: 0.5 }} color='success' />
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
              {products.map((product, index) => {
                const { id, name, year, color } = product;
                return (
                  <TableRow
                    onClick={() => handleOpen(product)}
                    key={index + '-' + name}
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
        <CustomModal product={selectedProduct} open={open} onClose={handleClose} />
      ) : null}
    </>
  );
};

export default ProductsTable;
