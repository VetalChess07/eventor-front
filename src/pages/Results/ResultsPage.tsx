import { GameTab } from '@/features/results/ui/GameTab/GameTab';
import { ResultsReport } from '@/features/results/ui/ResultsReport/ResultsReport';
import { Stack, Typography } from '@mui/material';

const ResultsPage = () => {
  return (
    <Stack spacing={2} component={'section'}>
      <Typography sx={{ color: '#4875b9' }} variant="h1">
        Очки учеников
      </Typography>

      <ResultsReport />
      <GameTab />
    </Stack>
  );
};

export default ResultsPage;
