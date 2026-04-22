import { Components, Theme } from '@mui/material';
import CheckboxIcon from '@shared/assets/icons/checked.svg?react';

export const componentsConfig: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: 'Inter-Bold',
        padding: '13.5px 20px',
        fontSize: '1.25rem',
        fontWeight: 600,
        textTransform: 'none',
        lineHeight: '100%',
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, #5AA1EF, #4875B9)',
        backgroundSize: '100% 200%',
        backgroundPosition: 'top',
        color: '#FFFFFF',
        border: 'none',
        outline: 'none',
        transition: 'all .5s',
        marginTop: '0',
        boxShadow: '0px 12px 36px rgba(51, 84, 134, 0.4)',
        '&:active': {
          transform: 'scale(1.2)',
        },
        '&:hover': {
          outline: 'none',
          backgroundPosition: 'bottom',
          border: 'none',
          transform: 'scale(1.1)',
        },
        '&:focus-visible, &:focus': {
          outline: 'none',
          border: 'none',
        },
        '&.Mui-disabled': {
          background: '#3D414E4D',
          color: '#696E80',
          boxShadow: 'none',
          fontFamily: 'Inter-SemiBold',
        },
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        color: '#4875B9',
        transition: 'all .5s',
        fontSize: '1.25rem',
        '&:hover': {
          color: '#B61D1D',
        },
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        fontWeight: 400,
        borderRadius: '5px',
        color: '#DCE0ED',
        border: 'none',
        background: 'linear-gradient(to bottom, #5AA1EF, #4875B9)',
        '&:hover': {
          borderColor: '#4875B9',
        },
        '&.Mui-focused': {
          borderColor: '#4875B9',
        },
        '&.Mui-disabled': {
          backgroundColor: '#626676',
          color: '#626676',
          borderColor: '#626676',
        },
      },
      select: {
        padding: '4px 8px',
      },
      icon: {
        color: '#DCE0ED',
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 60,
        height: 28,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      },
      switchBase: {
        padding: 2,
        transition: 'all .3s ease',
        background: 'linear-gradient(to bottom, #5AA1EF, #4875B9)',
        '&.Mui-checked': {
          transform: 'translateX(30px)',
          color: '#fff',
          '& + .MuiSwitch-track': {
            background: 'linear-gradient(to bottom, #5AA1EF, #4875B9)',
            opacity: 1,
            border: 0,
          },
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.3,
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
          background: 'linear-gradient(to bottom, #5AA1EF, #4875B9)',
        },
      },
      thumb: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
      track: {
        borderRadius: 17,
        backgroundColor: '#626676',
        opacity: 1,
        transition: 'background-color 0.3s',
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '4px',
        background:
          'linear-gradient(to bottom, rgba(90,161,239,0.95), rgba(72,117,185,0.95))',
        color: '#fff',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
        padding: '4px',
      },
      list: {
        padding: 0,
        '& .MuiMenuItem-root': {
          fontSize: '1rem',
          borderRadius: '4px',
          margin: '2px 0',
          transition: 'background 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255,255,255,0.25)',
          },
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        transition: 'all .5s',
        fontWeight: 400,
        outline: 'none',
        border: 'none',
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B61D1D',
          },
          '&.Mui-disabled': {
            backgroundColor: '#626676CC',
            '& .MuiOutlinedInput-notchedOutline': {
              backgroundColor: '#626676CC',
              borderColor: '#626676CC',
            },
            '& .MuiOutlinedInput-input': {
              color: '#23262F',
              WebkitTextFillColor: '#23262F',
              '&::placeholder': {
                color: '#23262F',
              },
            },
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            borderColor: '#4875B9',
          },
        '& .MuiOutlinedInput-input': {
          padding: '16px',
          backgroundColor: '#4875B9',
          borderRadius: '5px',
          color: '#DCE0ED',
          '&::placeholder': {
            color: '#DCE0ED',
            fontFamily: 'Inter-Regular',
            fontWeight: 400,
            lineHeight: '100%',
            opacity: 1,
          },
          '&:focus': {
            border: 'none',
            outline: 'none',
          },
        },
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        width: '17px',
        height: '17px',
        padding: '4px',
        borderRadius: '4.72px',
        outline: 'none',
        border: '1px solid #4875B9',
        margin: 0,
        '&.Mui-checked': {
          border: '1px solid #4875B9',
          background: '#4875B9',
        },
      },
    },
    defaultProps: {
      checkedIcon: <CheckboxIcon />,
      icon: <div />,
    },
  },

  MuiPagination: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '8px 14px',
        borderRadius: '8px',
        background: '#4875B9',
      },
      ul: {
        justifyContent: 'center',
        gap: '4px',
      },
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: {
        minWidth: '32px',
        height: '32px',
        borderRadius: '6px',
        color: '#FFFFFF',
        fontFamily: 'Inter-SemiBold',
        fontSize: '0.875rem',
        transition: 'background-color .2s, color .2s',
        '&:hover': {
          backgroundColor: '#FFFFFF29',
        },
        '&.Mui-selected': {
          backgroundColor: '#FFFFFF',
          color: '#4875B9',
          '&:hover': {
            backgroundColor: '#DCE0ED',
          },
        },
        '&.Mui-disabled': {
          color: '#FFFFFF66',
          opacity: 1,
        },
      },
      ellipsis: {
        color: '#FFFFFFCC',
      },
    },
  },

  MuiTable: {
    styleOverrides: {
      root: {
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        background: '#C0CEFF12',
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        background: '#C0CEFF12',
        border: '0',
        backdropFilter: 'blur(40px)',
        '& .MuiTableCell-root': {
          color: '#DCE0ED',
          fontWeight: 600,
          fontSize: '14px !important',
          padding: '14px 16px',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        color: '#DBE2E999',
        fontSize: '0.95rem',
        padding: '14px 16px',
        height: 'fit-content',
        borderRight: '0',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        verticalAlign: 'top',
        border: '0',
      },
    },
  },
};
