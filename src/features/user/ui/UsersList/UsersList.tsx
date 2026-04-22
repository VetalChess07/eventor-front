import { User, useSetUserBanStatusMutation } from '@/entities/user';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Switch,
  Stack,
  Typography,
} from '@mui/material';
import { CiEdit } from 'react-icons/ci';
import { useState } from 'react';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { statusUserKeys } from '@/entities/user/model/conts/statusKeys';
import { UsersSkeleton } from '../UsersSkeleton/UsersSkeleton';
import { DeleteUserModal } from '../DeleteUserModal/DeleteUserModal';

import { MdDeleteOutline } from 'react-icons/md';
import { AddUserToGameModal } from '../AddUserToGameModal/AddUserToGameModal';
import { UserGamesList } from '../UserGamesList/UserGamesList';

interface UsersListProps {
  isLoading: boolean;
  users: User[];
  onEdit: (user: User) => void;
  refetch: () => void;
}

export const UsersList = ({
  isLoading,
  users,
  onEdit,
  refetch,
}: UsersListProps) => {
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const { showSnackbar } = useSnackbar();

  const [deleteUserModal, setDeleteUserModal] = useState<User | null>(null);

  const [setUserBanStatusMutation] = useSetUserBanStatusMutation();

  const isIdLoading = (id: number) => loadingIds.includes(id);

  const setIdLoading = (id: number, value: boolean) => {
    setLoadingIds((prev) => {
      if (value) return Array.from(new Set([...prev, id]));
      return prev.filter((x) => x !== id);
    });
  };

  const handleToggleStatus = async (user: User) => {
    const status = user.status === 'ACTIVE' ? 'BAN' : 'ACTIVE';

    try {
      setIdLoading(user.id, true);
      await setUserBanStatusMutation({
        userId: user.id,
        status,
      }).unwrap();
      showSnackbar(
        `Пользователь ${user.id} ${status === 'BAN' ? 'забанен' : 'разбанен'}`,
        'success',
      );
    } catch (err: any) {
      showSnackbar(
        err?.data?.error ?? 'Ошибка при обновлении статуса',
        'error',
      );
    } finally {
      setIdLoading(user.id, false);
    }
  };

  if (isLoading) return <UsersSkeleton />;

  if (!users.length) return <p>Пользователи не найдены</p>;

  const verticalTextStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    minWidth: 40,
  };

  return (
    <Stack sx={{ width: '100%' }} gap={2}>
      <Typography sx={{ color: '#4875b9' }} variant="h3">
        Таблица со всеми пользователи
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ background: '#C0CEFF12', borderRadius: '12px' }}
      >
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 2,
              '& .MuiTableCell-root': {
                backgroundColor: '#1E1E2A',
                color: '#FFF',
                fontWeight: 500,
                verticalAlign: 'middle',
              },
            }}
          >
            <TableRow>
              <TableCell sx={verticalTextStyle}>ID</TableCell>
              <TableCell sx={verticalTextStyle}>Имя в Telegram</TableCell>
              <TableCell sx={verticalTextStyle}>Телефон</TableCell>
              <TableCell sx={verticalTextStyle}>Статус</TableCell>
              <TableCell sx={verticalTextStyle}>
                Мероприятия ученика
              </TableCell>
              <TableCell sx={verticalTextStyle}>Создан</TableCell>
              <TableCell sx={verticalTextStyle}>Обновлен</TableCell>
              <TableCell sx={verticalTextStyle}>Бан</TableCell>
              <TableCell sx={verticalTextStyle}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={verticalTextStyle}>{user.id}</TableCell>
                <TableCell sx={verticalTextStyle}>
                  {user.tgName || '-'}
                </TableCell>
                <TableCell sx={verticalTextStyle}>
                  {user.phone_number || '-'}
                </TableCell>
                <TableCell
                  sx={{
                    ...verticalTextStyle,
                    color:
                      user.status === 'ACTIVE'
                        ? 'rgb(72, 117, 185)'
                        : 'rgb(182, 29, 29)',
                  }}
                >
                  {statusUserKeys[user.status]}
                </TableCell>
                <TableCell sx={verticalTextStyle}>
                  <UserGamesList
                    userId={user.id}
                    games={user.games || []}
                    onRemoved={refetch}
                  />
                </TableCell>
                <TableCell sx={verticalTextStyle}>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell sx={verticalTextStyle}>
                  {user.updated_at
                    ? new Date(user.updated_at).toLocaleDateString()
                    : '-'}
                </TableCell>

                <TableCell sx={verticalTextStyle}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={'center'}
                    spacing={1}
                  >
                    <Switch
                      checked={user.status === 'ACTIVE'}
                      onChange={() => handleToggleStatus(user)}
                      disabled={isIdLoading(user.id)}
                    />
                    <div style={{ width: 16, height: 16 }}>
                      {isIdLoading(user.id) && <CircularProgress size={16} />}
                    </div>
                  </Stack>
                </TableCell>

                <TableCell sx={verticalTextStyle}>
                  <Stack
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                    direction="row"
                  >
                    <IconButton
                      sx={{
                        background:
                          'linear-gradient(to bottom, #5AA1EF, #4875B9)',
                        color: '#fff',
                      }}
                      onClick={() => onEdit(user)}
                      disabled={isIdLoading(user.id)}
                    >
                      <CiEdit />
                    </IconButton>
                    <IconButton
                      sx={{
                        background:
                          'linear-gradient(to bottom, #EF5A5A, #B92929)',
                        color: '#fff',
                      }}
                      onClick={() => setDeleteUserModal(user)}
                      disabled={isIdLoading(user.id)}
                    >
                      <MdDeleteOutline />
                    </IconButton>
                    <AddUserToGameModal user={user} refetch={refetch} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DeleteUserModal
          open={!!deleteUserModal}
          onClose={() => setDeleteUserModal(null)}
          user={deleteUserModal}
          refetch={refetch}
        />
      </TableContainer>
    </Stack>
  );
};
