import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteGameMutation } from '@/entities/games/model/api/game.api';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { Game } from '@/entities/games';

interface DeleteGameModalProps {
  open: boolean;
  onClose: () => void;
  game: Game | null;
  refetch: () => void;
}

export const DeleteGameModal = ({
  open,
  onClose,
  game,
  refetch,
}: DeleteGameModalProps) => {
  const [deleteGame, { isLoading }] = useDeleteGameMutation();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!game) return;
    try {
      await deleteGame({ gameId: game.id }).unwrap();
      showSnackbar('Мероприятие удалено', 'success');
      refetch();
      onClose();
    } catch (err: any) {
      showSnackbar(err?.data?.error ?? 'Ошибка при удалении', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#1E1E2A',
          borderRadius: 2,
          p: 4,
          width: 500,
          textAlign: 'left', // текст по левому краю
        }}
      >
        {/* Крестик */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          Удалить мероприятие
        </Typography>

        <Typography mb={4}>
          Вы уверены, что хотите удалить мероприятие <strong>{game?.name}</strong>?
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" disabled={isLoading} onClick={onClose}>
            Отмена
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
