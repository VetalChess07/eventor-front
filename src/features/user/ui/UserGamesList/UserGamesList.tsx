import { Stack, Typography, IconButton } from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

import { useRemoveUserFromGameMutation } from '@/entities/user/model/api/user.api';
import { Game } from '@/entities/games';

interface UserGamesListProps {
  userId: number;
  games: (Game & { number_ticket?: number; points?: number })[];
  onRemoved?: () => void;
}

export const UserGamesList = ({
  userId,
  games,
  onRemoved,
}: UserGamesListProps) => {
  const { showSnackbar } = useSnackbar();
  const [removeUserFromGame, { isLoading }] = useRemoveUserFromGameMutation();

  const handleRemove = async (gameId: number) => {
    try {
      await removeUserFromGame({ userId, gameId }).unwrap();
      showSnackbar(`Ученик удален из мероприятия ${gameId}`, 'success');
      onRemoved?.();
    } catch (err: any) {
      showSnackbar(err?.data?.error || 'Ошибка при удалении', 'error');
    }
  };

  if (!games || games.length === 0) return <Typography>-</Typography>;

  return (
    <Stack spacing={1}>
      {games.map((game) => (
        <Stack
          key={game.id}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ color: 'rgb(72, 117, 185)' }}>
              id:{game.id}
            </Typography>
            <Typography>{game.name}</Typography>
          </Stack>
          <IconButton
            onClick={() => handleRemove(game.id)}
            disabled={isLoading}
            size="small"
            sx={{ color: '#EF5A5A' }}
          >
            <MdDeleteOutline />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
};
