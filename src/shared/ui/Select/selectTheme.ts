import { SxProps, Theme } from '@mui/material/styles';
import { SelectVariant } from './const';

type SelectThemeParams = {
  variant?: SelectVariant;
};

export const selectTheme = ({
  variant = 'default',
}: SelectThemeParams): SxProps<Theme> => {
  switch (variant) {
    case 'outlined':
      return {
        fontSize: '1.25rem',
        fontWeight: 400,
        borderRadius: '5px',
        color: 'var( --primary-color)',
        background: 'var(--outlined-bg)',
        border: '1px solid var(--outlined-bg)',

        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--outlined-bg)',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--primary-color)',
        },

        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--primary-color)',
        },

        '&.Mui-disabled': {
          backgroundColor: 'var(--dark-gray)',
          color: 'var(--dark-gray)',
          borderColor: 'var(--dark-gray)',
        },

        '.MuiSelect-icon': {
          color: 'var(--primary-color)',
        },
      };

    case 'default':
    default:
      return {};
  }
};
