import { memo } from 'react';
import { Box } from '@mui/material';

type FilterType = 'select' | 'search';

interface FilterDef {
  name: string;
  type: FilterType;
  label?: string;
  options?: { value: string | number; label: string }[];
}

interface FiltersNavProps {}

export const FiltersNav = memo((props: FiltersNavProps) => {
  const {} = props;

  return (
    <Box
      component="nav"
      sx={{
        width: '100%',
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 2,
      }}
    ></Box>
  );
});
