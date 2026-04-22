import { useGetResultsByGameExcelMutation } from '@/entities/results/model/api/results.api';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { GameSelect } from '@/widgets/GameSelect/GameSelect';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

export const ResultsReport = () => {
  const [getResultsByGameExcel, { isLoading }] =
    useGetResultsByGameExcelMutation();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const { showSnackbar } = useSnackbar();

  const handleDownloadResults = async (gameId: number | null) => {
    if (!gameId) {
      showSnackbar('Выберите мероприятие', 'warning');
      return;
    }

    try {
      const blob = await getResultsByGameExcel({ gameId }).unwrap();

      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);

      a.href = url;
      a.download = `event_points_${gameId}.xlsx`;
      a.style.display = 'none';
      document.body.appendChild(a);

      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);

      showSnackbar('Файл с очками успешно скачан', 'success');
    } catch (error) {
      console.error('Ошибка при скачивании отчета очков:', error);
      showSnackbar('Ошибка при скачивании отчета', 'error');
    }
  };
  return (
    <Stack sx={{ width: '100%' }} gap={2}>
      <Stack
        direction={'row'}
        gap={1}
        sx={{ width: '100%' }}
        alignItems="center"
      >
        <GameSelect
          value={selectedGame}
          onChange={setSelectedGame}
          disabled={isLoading}
          sx={{ minWidth: '120px', maxWidth: '300px' }}
        />
        <Button
          disabled={isLoading || !selectedGame}
          onClick={() => handleDownloadResults(selectedGame)}
          sx={{ fontSize: '.75rem' }}
          variant="contained"
        >
          Скачать очки по мероприятию с id: {selectedGame || '-'}
        </Button>
      </Stack>
    </Stack>
  );
};
