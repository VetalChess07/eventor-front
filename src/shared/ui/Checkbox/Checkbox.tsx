import {
  Checkbox as CheckboxMUI,
  CheckboxProps as CheckboxPropsMUI,
  SxProps,
  Theme,
  Typography,
  FormControlLabel,
} from '@mui/material';
import { memo } from 'react';

interface CheckboxProps extends CheckboxPropsMUI {
  sxLabel?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  title?: string;
}

export const Checkbox = memo((props: CheckboxProps) => {
  const { checked, value, onChange, title, sxLabel, sx, ...rest } = props;

  return (
    <FormControlLabel
      sx={{ ...(sx ?? {}), margin: 0 }}
      control={
        <CheckboxMUI
          checked={checked}
          value={value}
          onChange={onChange}
          {...rest}
        />
      }
      label={
        <Typography
          sx={{ marginLeft: '8px', ...(sxLabel ?? {}) }}
          variant="body1"
        >
          {title}
        </Typography>
      }
    />
  );
});
