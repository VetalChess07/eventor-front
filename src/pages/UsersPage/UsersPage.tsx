import { User } from '@/entities/user';
import { useGetAllUsersQuery } from '@/entities/user/model/api/user.api';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { Stack, Typography, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { CreateUserForm, UpdateUserModal, UsersList } from '@/features/user';
import { SearchUserForm } from '@/features/user/ui/SearchUserForm/SearchUserForm';
import { ITEMS_PER_PAGE } from '@/shared/types/pagination';

import { UsersReport } from '@/features/user/ui/UsersReport/UsersReport';

const UsersPage = () => {
  const [editUser, setEditUser] = useState<User | null>(null);
  const [searchedUser, setSearchedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, refetch, data } = useGetAllUsersQuery({
    limit: ITEMS_PER_PAGE,
    page,
  });

  const users = data?.data || [];
  const totalCount = data?.meta?.total ?? 0;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    if (!isLoading && users.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [users, isLoading]);

  useEffect(() => {
    refetch();
  }, [page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isError)
    return <ErrorAlert message={getErrorMessage(error)} sx={{ mt: '24px' }} />;

  return (
    <Stack gap={4} alignItems="flex-start">
      <Typography sx={{ color: '#4875b9' }} variant="h1">
        Пользователи
      </Typography>

      <SearchUserForm
        refetch={refetch}
        onResult={setSearchedUser}
        searchedUser={searchedUser}
      />

      <CreateUserForm refetch={refetch} />

      <UpdateUserModal
        open={!!editUser}
        onClose={() => setEditUser(null)}
        user={editUser}
        refetch={refetch}
      />

      <UsersList
        refetch={refetch}
        isLoading={isLoading}
        users={users}
        onEdit={setEditUser}
      />

      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      )}
      <UsersReport />
    </Stack>
  );
};

export default UsersPage;
