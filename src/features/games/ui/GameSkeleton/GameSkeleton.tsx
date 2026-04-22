import { Box, Skeleton, Stack } from '@mui/material';

export const GameSkeleton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 2,
        backgroundColor: '#1b1d24',
        p: 2,
        boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={'100%'}
            height={24}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '4px',
            }}
          />
        ))}
      </Box>

      {/* Строки таблицы */}
      <Stack spacing={1}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={60}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.08)', // более тёмный серый
              borderRadius: '6px',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};
