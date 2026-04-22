import {
  DatePicker as MUIDatePicker,
  DatePickerProps as MUIDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Box, SxProps, TypographyProps } from '@mui/material';
import { Theme } from '@emotion/react';
import Typography from '@mui/material/Typography';

interface CustomDatePickerProps
  extends Omit<MUIDatePickerProps<Dayjs>, 'value' | 'onChange' | 'format'> {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  label?: string;
  format?: string;
  labelVariant?: TypographyProps['variant'];
  sxLabel?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  placeholder?: string;
}

export const DatePicker = ({
  value,
  onChange,
  label = 'Дата',
  format = 'DD.MM.YYYY',
  sxLabel = {},
  sx = {},
  labelVariant,
  placeholder = '',
  ...rest
}: CustomDatePickerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        margin: '0',
        ...sx,
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: '14px',
            display: 'inline-block',
            ...sxLabel,
          }}
          component="span"
          textAlign="left"
          variant={labelVariant}
        >
          {label}
        </Typography>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <MUIDatePicker
          value={value}
          onChange={onChange}
          format={format}
          slotProps={{
            textField: {
              sx: {
                '& .MuiOutlinedInput-root': {
                  background: '#fff',

                  '& fieldset': {
                    border: '1px solid #4875B9',
                  },

                  '&:hover fieldset': {
                    border: '2px solid #4875B9',
                  },

                  '&.Mui-focused fieldset': {
                    border: '2px solid #4875B9',
                  },
                },

                '& .MuiInputAdornment-root': {
                  margin: 0,
                  '& .MuiIconButton-root': {
                    padding: '8px 8px 8px 12px',
                  },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};
