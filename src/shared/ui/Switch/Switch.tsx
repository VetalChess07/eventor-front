import { Position } from '@/shared/types/position';
import { FormControlLabel } from '@mui/material';
import SwitchMUI from '@mui/material/Switch';
import { SwitchProps as SwitchPropsMUI } from '@mui/material/Switch';
import { CSSProperties } from 'react';
import { Typography } from '@mui/material';

export interface SwitchProps extends SwitchPropsMUI {
  label?: string;
  stylesInner?: CSSProperties;
  position?: Position;
}

export const Switch = ({
  checked,
  onChange,
  label = '',
  stylesInner,
  position = 'before',
  ...rest
}: SwitchProps) => {
  return (
    <FormControlLabel
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '4px',
        margin: '0',
        ...stylesInner,
      }}
      label={null}
      control={
        <>
          {position === 'before' && (
            <Typography component="span" variant="body2">
              {label}
            </Typography>
          )}
          <SwitchMUI checked={checked} onChange={onChange} {...rest} />
          {position === 'after' && (
            <Typography component="span" variant="body2">
              {label}
            </Typography>
          )}
        </>
      }
    />
  );
};
