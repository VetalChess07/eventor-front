// shared/ui/skeleton/SkeletonDefault.tsx

import React from 'react';
import {
  Skeleton as SkeletonMUI,
  SkeletonProps as SkeletonPropsMUI,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { grey } from '@mui/material/colors';

interface SkeletonProps extends SkeletonPropsMUI {
  width?: number | string;
  height?: number | string;
  sx?: SxProps;
  color?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  sx,
  color = grey[500],
  variant = 'rounded',
  ...props
}) => {
  return (
    <SkeletonMUI
      width={width}
      height={height}
      variant={variant}
      sx={{
        bgcolor: color,
        ...sx,
      }}
      {...props}
    />
  );
};

export { Skeleton };
