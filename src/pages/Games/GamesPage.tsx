import { CreateGameModal, GamesList } from '@/features/games';
import { useGetAllGameQuery } from '@/entities/games/model/api/game.api';

import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { ITEMS_PER_PAGE } from '@/shared/types/pagination';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { Stack, Button, Typography, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';

const GamesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { isLoading, isError, error, refetch, data } = useGetAllGameQuery({
    limit: ITEMS_PER_PAGE,
    page,
  });

  const games = data?.data || [];
  const totalCount = data?.meta?.total ?? 0;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    if (!isLoading && games.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [games, isLoading]);

  useEffect(() => {
    refetch();
  }, [page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (isError)
    return (
      <ErrorAlert message={getErrorMessage(error)} sx={{ marginTop: '24px' }} />
    );

  return (
    <Stack sx={{ alignItems: 'flex-start' }} gap={'32px'}>
      <Typography sx={{ color: '#4875b9' }} variant="h1" component={'h1'}>
        Мероприятия
      </Typography>

      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Создать мероприятие
      </Button>

      <CreateGameModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />

      <GamesList isLoading={isLoading} games={games} refetch={refetch} />

      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </Stack>
  );
};

export default GamesPage;
