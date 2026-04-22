import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMUI, { SelectChangeEvent } from '@mui/material/Select';
import type { SelectProps as SelectPropsMUI } from '@mui/material/Select';
import {
  Box,
  SxProps,
  Theme,
  TypographyProps,
  Typography,
} from '@mui/material';
import { SelectVariant } from './const';

import { selectTheme } from './selectTheme';
import { ReactNode } from 'react';
import { OptionsSelect } from '@/shared/types/ui';

export interface SelectOption {
  value: string | number;
  label: string | ReactNode;
}

type SelectProps = Omit<SelectPropsMUI, 'onChange'> & {
  label?: string;
  value: string | number;
  options: OptionsSelect[];
  fullWidth?: boolean;
  id?: string;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  labelVariant?: TypographyProps['variant'];
  sxInner?: SxProps<Theme> | undefined;
  sxLabel?: SxProps<Theme> | undefined;
  sxFormControl?: SxProps<Theme> | undefined;
  variantSelect?: SelectVariant;
  renderValue?: (value: string | number) => ReactNode;
  sx?: SxProps<Theme>;
};

export const Select = (props: SelectProps) => {
  const {
    value,
    id,
    label,
    onChange,
    options,
    sxLabel,
    sxInner,
    sxFormControl,
    labelVariant,
    fullWidth,
    variantSelect = 'default',
    renderValue,
    variant,
    sx,
  } = props;

  const selectStyles = {
    ...(sx ?? {}),
    ...selectTheme({ variant: variantSelect }),
  };

  return (
    <Box className="w-full" sx={sxInner}>
      <FormControl
        sx={{ minWidth: 120, width: '100%', ...(sxFormControl ?? {}) }}
      >
        {label && (
          <Typography
            sx={{ fontSize: '1rem', marginBottom: '8px', ...sxLabel }}
            component="span"
            textAlign="left"
            variant={labelVariant}
          >
            {label}
          </Typography>
        )}
        <SelectMUI
          sx={selectStyles}
          className="w-full"
          fullWidth={fullWidth}
          labelId={`${id}-label`}
          id={id}
          value={value}
          onChange={onChange}
          displayEmpty
          renderValue={renderValue}
        >
          {options &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </SelectMUI>
      </FormControl>
    </Box>
  );
};
