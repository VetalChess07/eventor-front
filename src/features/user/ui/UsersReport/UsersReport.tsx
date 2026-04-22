import {
  useGetAllUsersReportMutation,
  useGetUsersByGameReportMutation,
} from '@/entities/user/model/api/user.api';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { GameSelect } from '@/widgets/GameSelect/GameSelect';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';

export const UsersReport = () => {
  const [getAllUsersReport, { isLoading }] = useGetAllUsersReportMutation();
  const [getUsersByGameReport, { isLoading: isLoadingByGame }] =
    useGetUsersByGameReportMutation();

  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const { showSnackbar } = useSnackbar();

  const handleDownloadAllUsers = async () => {
    try {
      const blob = await getAllUsersReport({ limit: 1000, page: 1 }).unwrap();

      // Создаем ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `users_report_${Date.now()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSnackbar('файл успешно скачен', 'success');
    } catch (error) {
      console.error('Ошибка при скачивании отчета:', error);
      showSnackbar('Ошибка при скачивании отчета', 'error');
    }
  };

  const handleDownloadGameUsers = async (gameId: number | null) => {
    if (!gameId) return null;
    try {
      const blob = await getUsersByGameReport({
        gameId,
        limit: 1000,
        page: 1,
      }).unwrap();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `users_game_${gameId}_report_${Date.now()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSnackbar('файл успешно скачен', 'success');
    } catch (error) {
      console.error('Ошибка при скачивании отчета по игре:', error);
      showSnackbar('Ошибка при скачивании отчета', 'error');
    }
  };

  return (
    <Stack sx={{ width: '100%' }} gap={2}>
      <Button
        disabled={isLoadingByGame || isLoading}
        onClick={handleDownloadAllUsers}
        sx={{ fontSize: '.75rem', width: 'fit-content' }}
      >
        Скачать всех юзеров
      </Button>
      <Stack direction={'row'} gap={1} sx={{ width: '100%' }}>
        <GameSelect
          value={selectedGame}
          onChange={setSelectedGame}
          disabled={isLoading}
          sx={{ minWidth: '120px', maxWidth: '300px' }}
        />
        <Button
          disabled={isLoadingByGame || isLoading}
          onClick={() => handleDownloadGameUsers(selectedGame)}
          sx={{ fontSize: '.75rem' }}
        >
          Скачать юзеров по теме: {selectedGame || '-'}
        </Button>
      </Stack>
    </Stack>
  );
};
