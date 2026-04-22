import { Stack, Button, Typography, Divider, Box } from '@mui/material';
import { useState } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import PhoneInput from '@/shared/ui/InputPhone/PhoneInput';
import { useSearchUserMutation } from '@/entities/user/model/api/user.api';
import { User } from '@/entities/user';
import { statusUserKeys } from '@/entities/user/model/conts/statusKeys';
import { AddUserToGameModal } from '../AddUserToGameModal/AddUserToGameModal';

interface SearchUserFormProps {
  onResult: (user: User | null) => void;
  searchedUser: User | null;
  refetch: () => void;
}

export const SearchUserForm = ({
  onResult,
  searchedUser,
  refetch,
}: SearchUserFormProps) => {
  const [phone, setPhone] = useState('');
  const [tgName, setTgName] = useState('');
  const [errors, setErrors] = useState({ phone: '', tgName: '' });

  const [searchUser, { isLoading }] = useSearchUserMutation();
  const { showSnackbar } = useSnackbar();

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

  const handleSubmit = async () => {
    if (!validateForm()) {
      showSnackbar('Проверьте ошибки в форме', 'error');
      return;
    }

    const cleanPhone = phone.replace(/[^\d]/g, '');

    try {
      const response = await searchUser({
        phone_number: cleanPhone,
        tgName,
      }).unwrap();
      showSnackbar('Пользователь найден', 'success');
      onResult(response.data);
    } catch (err: any) {
      showSnackbar(err?.data?.error ?? 'Пользователь не найден', 'error');
      onResult(null);
    }
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
      <Typography
        sx={{
          width: '100%',
          color: '#4875b9',
          textAlign: 'left',
        }}
        variant="h3"
      >
        Поиск
      </Typography>
      <Stack
        sx={{ width: '100%', alignItems: 'center' }}
        gap={2}
        direction={{ xs: 'column', md: 'row' }}
      >
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
        <Typography sx={{ textAlign: 'center', color: '#888' }}>или</Typography>
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
        <Button
          sx={{ minWidth: '100px' }}
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Найти
        </Button>
      </Stack>

      {searchedUser && (
        <>
          <AddUserToGameModal refetch={refetch} user={searchedUser} />
          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#f9f9f9',
              width: '100%',
            }}
          >
            <Typography sx={{ color: '#4875B9' }} variant="h6">
              Результат поиска:
            </Typography>
            <Typography sx={{ color: '#4875B9' }}>
              ID: {searchedUser.id}
            </Typography>
            <Typography sx={{ color: '#4875B9' }}>
              Telegram: {searchedUser.tgName ?? '-'}
            </Typography>
            <Typography sx={{ color: '#4875B9' }}>
              Телефон: {searchedUser.phone_number ?? '-'}
            </Typography>
            <Typography sx={{ color: '#4875B9' }}>
              Статус: {statusUserKeys[searchedUser.status]}
            </Typography>
          </Box>
        </>
      )}
    </Stack>
  );
};
