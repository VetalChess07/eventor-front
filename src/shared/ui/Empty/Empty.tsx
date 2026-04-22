import { Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

interface EmptyProps {
  message?: string;
  styles?: CSSProperties;
  children?: ReactNode;
}

const Empty = (props: EmptyProps) => {
  const { children, styles, message } = props;

  if (children) return children;

  return (
    <div
      style={{
        ...styles,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="span">
        {message ?? 'Нет данных'}
      </Typography>
    </div>
  );
};

export { Empty };
