import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

interface LoaderProps extends CircularProgressProps {
  sxInner?: SxProps<Theme> | undefined;
}

export const Loader = (props: LoaderProps) => {
  const { sxInner, ...other } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        ...sxInner,
      }}
    >
      <CircularProgress {...other} />
    </Box>
  );
};
