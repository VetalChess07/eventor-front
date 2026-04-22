import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useGetSuccessSummaryQuery } from '@/entities/results/model/api/results.api';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

const ITEMS_PER_PAGE = 16;

export const SuccessSummaryTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetSuccessSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const summary = data?.data ?? [];
  const pageCount = Math.ceil(summary.length / ITEMS_PER_PAGE);
  const pageOffset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedSummary = useMemo(
    () => summary.slice(pageOffset, pageOffset + ITEMS_PER_PAGE),
    [summary, pageOffset],
  );

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) return <Loader />;
  if (error)
    return <ErrorAlert message="Ошибка при загрузке сводной таблицы" />;

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: '#4875b9' }} variant="h3">
        Успех по всем мероприятиям
      </Typography>

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
              <TableCell>Имя / телефон</TableCell>
              <TableCell align="center">Мероприятий</TableCell>
              <TableCell align="center">Всего очков</TableCell>
              <TableCell align="center">Средний балл</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedSummary.map((item, index) => {
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

      {pageCount > 1 && (
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      )}
    </Stack>
  );
};
