import { Modal, Stack, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDeleteUserMutation } from '@/entities/user/model/api/user.api';
import { User } from '@/entities/user';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  refetch: () => void;
}

export const DeleteUserModal = ({
  open,
  onClose,
  user,
  refetch,
}: DeleteUserModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      await deleteUser({ id: user.id }).unwrap();
      showSnackbar(`Пользователь ${user.tgName || user.id} удален`, 'success');
      refetch();
      onClose();
    } catch (err: any) {
      showSnackbar(
        err?.data?.error ?? 'Ошибка при удалении пользователя',
        'error',
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#1E1E2A',
          borderRadius: 2,
          p: 4,
          width: 500,
          gap: '24px',
        }}
      >
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

        <Typography variant="h6">Удалить пользователя?</Typography>
        <Typography sx={{ lineHeight: '1rem' }}>
          Вы уверены, что хотите удалить пользователя {user.tgName || user.id}?
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Удаляем...' : 'Удалить'}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
