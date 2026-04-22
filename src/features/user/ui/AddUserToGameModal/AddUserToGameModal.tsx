import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Stack, Button } from '@mui/material';
import { Input } from '@/shared/ui/Input/Input';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { useAddUserByGameMutation } from '@/entities/user/model/api/user.api';
import { User } from '@/entities/user';
import { GameSelect } from '@/widgets/GameSelect/GameSelect';
import { useSearchParams } from 'react-router-dom';
import { statusUserKeys } from '@/entities/user/model/conts/statusKeys';

interface AddUserToGameModalProps {
  user: User;
  refetch?: () => void;
}

export const AddUserToGameModal = ({
  user,
  refetch,
}: AddUserToGameModalProps) => {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState('0');
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [searchParams] = useSearchParams();

  const [addUserByGame, { isLoading }] = useAddUserByGameMutation();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (selectedGame === null) {
      const gameIdFromQuery = searchParams.get('gameId');
      if (gameIdFromQuery) setSelectedGame(Number(gameIdFromQuery));
    }
  }, []);

  useEffect(() => {
    const gameIdFromQuery = searchParams.get('gameId');
    if (gameIdFromQuery) setSelectedGame(Number(gameIdFromQuery));
  }, [searchParams]);

  const handleSubmit = async () => {
    if (!selectedGame) {
      showSnackbar('Выберите мероприятие', 'error');
      return;
    }

    const numericPoints = Number(points);
    if (!Number.isInteger(numericPoints) || numericPoints < 0) {
      showSnackbar('Очки должны быть целым неотрицательным числом', 'error');
      return;
    }

    try {
      await addUserByGame({
        userId: user.id,
        gameId: selectedGame,
        points: numericPoints,
      }).unwrap();

      showSnackbar('Ученик успешно добавлен в мероприятие', 'success');
      refetch?.();
      setPoints('0');
      setOpen(false);
    } catch (err: any) {
      showSnackbar(
        err?.data?.error ?? 'Ошибка при добавлении пользователя',
        'error',
      );
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{ height: 36 }}
      >
        Добавить в мероприятие
      </Button>

      <Modal sx={{ p: '110px' }} open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#1E1E2A',
            borderRadius: 2,
            p: 4,
            width: '100%',
            maxWidth: { xs: '90dvw', sm: '500px' },
            gap: 3,
            maxHeight: '95dvh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" mb={2}>
            Добавить ученика в мероприятие
          </Typography>

          <Stack spacing={2}>
            <GameSelect
              value={selectedGame}
              onChange={setSelectedGame}
              disabled={isLoading}
            />

            <Input
              label="Стартовые очки"
              value={points}
              type="number"
              inputProps={{ min: 0 }}
              onChange={(e) => {
                setPoints(e.target.value);
              }}
              placeholder="Введите очки"
              fullWidth
            />
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <Typography sx={{ color: '#4875B9' }} variant="h6">
                Ученик:
              </Typography>
              <Typography sx={{ color: '#4875B9' }}>ID: {user.id}</Typography>
              <Typography sx={{ color: '#4875B9' }}>
                Имя: {user.tgName ?? '-'}
              </Typography>
              <Typography sx={{ color: '#4875B9' }}>
                Телефон: {user.phone_number ?? '-'}
              </Typography>
              <Typography sx={{ color: '#4875B9' }}>
                Статус: {statusUserKeys[user.status]}
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={() => setOpen(false)} color="inherit">
                Отмена
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={isLoading}
              >
                Добавить
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
