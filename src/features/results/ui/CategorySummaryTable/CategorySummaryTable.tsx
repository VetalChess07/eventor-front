import {
  Box,
  Chip,
  Pagination,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { gameCategoryLabels } from '@/entities/games/model/conts/categories';
import { useGetCategorySummaryQuery } from '@/entities/results/model/api/results.api';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

const ITEMS_PER_PAGE = 16;

export const CategorySummaryTable = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetCategorySummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const categories = data?.data ?? [];
  const selectedCategory = categories[categoryIndex];
  const users = selectedCategory?.users ?? [];
  const pageCount = Math.ceil(users.length / ITEMS_PER_PAGE);
  const pageOffset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = useMemo(
    () => users.slice(pageOffset, pageOffset + ITEMS_PER_PAGE),
    [users, pageOffset],
  );

  useEffect(() => {
    setPage(1);
  }, [categoryIndex]);

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const handleCategoryChange = (_: React.SyntheticEvent, value: number) => {
    setCategoryIndex(value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorAlert message="Ошибка при загрузке статистики по категориям" />
    );

  if (!selectedCategory) {
    return (
      <Typography sx={{ color: '#DCE0ED' }}>
        Статистика по категориям пока недоступна
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: '#4875b9' }} variant="h3">
        Статистика по категориям
      </Typography>

      <Tabs
        value={categoryIndex}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {categories.map((item) => (
          <Tab
            sx={{
              color: '#fff',
            }}
            key={item.category}
            label={
              gameCategoryLabels[item.category] ?? gameCategoryLabels.other
            }
          />
        ))}
      </Tabs>

      <Stack direction="row" gap={1} flexWrap="wrap">
        <Chip
          sx={{
            color: '#fff',
            '&.MuiChip-root': {
              color: '#fff',
            },
          }}
          label={`Учеников: ${selectedCategory.usersCount}`}
        />
        <Chip
          sx={{
            color: '#fff',
            '&.MuiChip-root': {
              color: '#fff',
            },
          }}
          label={`Мероприятий: ${selectedCategory.eventsCount}`}
        />
        <Chip
          sx={{
            color: '#fff',
            '&.MuiChip-root': {
              color: '#fff',
            },
          }}
          label={`Всего очков: ${selectedCategory.totalPoints}`}
        />
        <Chip
          sx={{
            color: '#fff',
            '&.MuiChip-root': {
              color: '#fff',
            },
          }}
          label={`Средний балл: ${selectedCategory.averagePoints}`}
        />
      </Stack>

      <TableContainer
        component={Paper}
        sx={{ background: '#C0CEFF12', borderRadius: '12px' }}
      >
        <Table>
          <TableHead
            sx={{
              '& .MuiTableCell-root': {
                backgroundColor: '#1E1E2A',
                color: '#FFFFFF',
                fontWeight: 500,
              },
            }}
          >
            <TableRow>
              <TableCell>Место</TableCell>
              <TableCell>ID ученика</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Группа</TableCell>
              <TableCell>Имя / телефон</TableCell>
              <TableCell align="center">Мероприятий</TableCell>
              <TableCell align="center">Всего очков</TableCell>
              <TableCell align="center">Средний балл</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((item, index) => {
              const displayName = item.user.tgName
                ? `@${item.user.tgName}`
                : item.user.phone_number;
              const position = pageOffset + index + 1;

              return (
                <TableRow
                  key={item.user.id}
                  sx={{
                    background: index % 2 === 0 ? '#111520' : '#C0CEFF0A',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell sx={{ color: '#DCE0ED' }}>#{position}</TableCell>
                  <TableCell sx={{ color: '#DCE0ED' }}>
                    {item.user.id}
                  </TableCell>
                  <TableCell sx={{ color: '#DCE0ED' }}>
                    {item.user.name ?? '-'}
                  </TableCell>
                  <TableCell sx={{ color: '#DCE0ED' }}>
                    {item.user.group ?? '-'}
                  </TableCell>
                  <TableCell sx={{ color: '#DCE0ED' }}>
                    {displayName ?? '-'}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#DCE0ED' }}>
                    {item.eventsCount}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#DCE0ED' }}>
                    {item.totalPoints}
                  </TableCell>
                  <TableCell align="center" sx={{ color: '#DCE0ED' }}>
                    {item.averagePoints}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {paginatedUsers.length === 0 && (
        <Box sx={{ color: '#DCE0ED', textAlign: 'center' }}>
          В этой категории пока нет данных
        </Box>
      )}

      {pageCount > 1 && (
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      )}
    </Stack>
  );
};
