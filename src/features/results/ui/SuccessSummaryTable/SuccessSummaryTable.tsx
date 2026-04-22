import {
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

import { useGetSuccessSummaryQuery } from '@/entities/results/model/api/results.api';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';

export const SuccessSummaryTable = () => {
  const { data, isLoading, error } = useGetSuccessSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const summary = data?.data ?? [];

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
            {summary.map((item, index) => {
              const displayName = item.user.tgName
                ? `@${item.user.tgName}`
                : item.user.phone_number;
              const position = index + 1;

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
    </Stack>
  );
};
