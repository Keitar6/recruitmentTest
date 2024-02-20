import ProductsTable from '@components/ProductsTable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Tag } from '@mui/icons-material';

import './App.css';

function App() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Tag sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id='input-with-sx'
          label='Product id'
          variant='standard'
          type='number'
          color='success'
        />
      </Box>

      <ProductsTable />
    </>
  );
}

export default App;
