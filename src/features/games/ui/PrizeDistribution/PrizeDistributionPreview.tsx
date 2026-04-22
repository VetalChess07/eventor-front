import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import coin from '@/shared/assets/icons/logo-single.svg';

type PrizeDistributionPreviewProps = {
  output: string[];
};

export const PrizeDistributionPreview: FC<PrizeDistributionPreviewProps> = ({
  output,
}) => {
  if (output.length === 0) return null;

  return (
    <Box>
      <Typography variant="subtitle2">Итоговое распределение:</Typography>

      <Stack
        gap={2}
        sx={{ p: 2, mt: 2, border: '1px solid #4875B9', borderRadius: '8px' }}
      >
        {output.map((line, idx) => (
          <Typography
            key={idx}
            sx={{
              fontSize: '1.2rem',
              whiteSpace: 'pre-line',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {line}
            <Box component="img" src={coin} width={18} height={18} />
          </Typography>
        ))}
      </Stack>
    </Box>
  );
};
