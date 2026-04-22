import { Modal, Stack, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import PhoneInput from '@/shared/ui/InputPhone/PhoneInput';
import { User, useUpdateUserMutation } from '@/entities/user';

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  user?: User | null;
}

export const UpdateUserModal = ({
  open,
  onClose,
  refetch,
  user,
}: UpdateUserModalProps) => {
  const [phone, setPhone] = useState('');
  const [tgName, setTgName] = useState('');
  const [errors, setErrors] = useState({ phone: '', tgName: '' });

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { showSnackbar } = useSnackbar();

  const resetForm = () => {
    setPhone('');
    setTgName('');
    setErrors({ phone: '', tgName: '' });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors = { phone: '', tgName: '' };
    let isValid = true;

    if (!phone.trim() && !tgName.trim()) {
      newErrors.phone = 'Укажите номер телефона или Telegram ник';
      newErrors.tgName = 'Укажите номер телефона или Telegram ник';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (user?: User | null) => {
    if (!user) return showSnackbar('Нет данных юзера', 'error');

    if (!validateForm()) {
      showSnackbar('Проверьте ошибки в форме', 'error');
      return;
    }

    const cleanPhone = phone.replace(/[^\d]/g, '');

    try {
      await updateUser({
        id: user.id,
        phone_number: cleanPhone,
        tgName,
      }).unwrap();
      showSnackbar('Пользователь обновлён', 'success');
      refetch();
      handleClose();
    } catch (err: any) {
      showSnackbar(
        err?.data?.error ?? 'Ошибка при обновлении пользователя',
        'error',
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          gap: 3,
          maxHeight: '95dvh',
          overflowY: 'auto',
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6">Обновить пользователя</Typography>

        <Stack spacing={2}>
          <PhoneInput
            value={phone}
            label="Номер телефона"
            placeholder="Введите номер телефона"
            error={!!errors.phone}
            helperText={errors.phone}
            onChange={(value) => {
              setPhone(value);
              if (value.trim()) setTgName('');
              setErrors({ phone: '', tgName: '' });
            }}
          />

          <Typography sx={{ textAlign: 'center', color: '#888' }}>
            или
          </Typography>

          <Input
            placeholder="Telegram ник"
            fullWidth
            value={tgName}
            error={!!errors.tgName}
            helperText={errors.tgName}
            onChange={(e) => {
              setTgName(e.target.value);
              if (e.target.value.trim()) setPhone('');
              setErrors({ phone: '', tgName: '' });
            }}
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClose} disabled={isLoading}>
            Закрыть
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit(user)}
            disabled={isLoading}
          >
            Сохранить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
