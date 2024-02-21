import { Modal, Box, Typography, ModalProps, SxProps } from '@mui/material';
import { Product } from '@store/reducers/products/slice';
import { capitalizeFirstLetter } from '@utils/functions/capitalizeFirstLetter';

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

export type CustomModalProps = Omit<ModalProps, 'children'> & { product: Product };

export const CustomModal = (props: CustomModalProps) => {
  const { product } = props;
  const { name, color } = product;

  const IDS = {
    title: `${name} modal - title`,
    description: `${name} modal - description`,
  };

  return (
    <Modal
      {...props}
      aria-labelledby={IDS.title}
      aria-describedby={IDS.description}
      data-testid='dialog'
    >
      <Box sx={style({ color })}>
        <Typography id={IDS.title} variant='h6' component='h2'>
          All you need to know about{' '}
          <Typography id={IDS.title + `/name`} variant='h6' component='textPath' sx={{ color }}>
            {name}
          </Typography>
        </Typography>

        <Typography id={IDS.description} sx={{ mt: 2 }}>
          {Object.entries(product).map(([name, value]) => (
            <>
              {capitalizeFirstLetter(name)}:{' '}
              <Typography
                id={IDS.description + `/` + name}
                variant='h6'
                component='textPath'
                sx={{ color }}
              >
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
