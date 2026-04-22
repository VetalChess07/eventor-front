import '@mui/material/Button';
import '@mui/material/Select';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    danger: true;
    clear: true;
    secondary: true;
  }
}

declare module '@mui/material/Select' {
  interface SelectPropsVariantOverrides {
    dashed: true;
  }
}
