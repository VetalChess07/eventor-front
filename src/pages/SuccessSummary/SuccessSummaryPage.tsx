import { CategorySummaryTable } from '@/features/results/ui/CategorySummaryTable/CategorySummaryTable';
import { SuccessSummaryTable } from '@/features/results/ui/SuccessSummaryTable/SuccessSummaryTable';
import { Stack, Typography } from '@mui/material';

const SuccessSummaryPage = () => {
  return (
    <Stack spacing={2} component="section">
      <Typography sx={{ color: '#4875b9' }} variant="h1">
        Таблица результатов
      </Typography>

      <SuccessSummaryTable />
      <CategorySummaryTable />
    </Stack>
  );
};

export default SuccessSummaryPage;
