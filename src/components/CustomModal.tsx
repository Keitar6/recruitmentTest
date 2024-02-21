import { Modal, Box, Typography, ModalProps, SxProps } from '@mui/material';
import { Product } from '@store/reducers/products/slice';
import { capitalizeFirstLetter } from 'utils/functions/capitalizeFirstLetter';

const style: (args: { color?: string }) => SxProps = () => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
});

type CustomModalProps = ModalProps & { product: Product };

export const CustomModal = (props: CustomModalProps) => {
  const { product } = props;
  const { name, color } = product;

  const baseId = `${name} modal - `;

  return (
    <Modal {...props} aria-labelledby={baseId} aria-describedby={baseId}>
      <Box sx={style({ color })}>
        <Typography id={baseId} sx={{ mt: 2 }}>
          {Object.entries(product).map(([name, value]) => (
            <>
              {capitalizeFirstLetter(name)}:{' '}
              <Typography id={baseId + name} variant='h6' component='textPath' sx={{ color }}>
                {value}
              </Typography>
              <br />
            </>
          ))}
        </Typography>
      </Box>
    </Modal>
  );
};
