import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { Chip, Stack, Typography } from '@mui/material';

import {
  useGetResultsByGameIdQuery,
  useUpdateStudentPointsMutation,
} from '@/entities/results/model/api/results.api';
import { PrizeRange } from '@/entities/games/model/types/games.types';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ErrorAlert } from '@/widgets/ErrorAlert/ErrorAlert';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';

interface GameTabContentProps {
  gameId: number;
  pointRanges: PrizeRange[];
}

const expandPointSlots = (ranges: PrizeRange[]) =>
  ranges.flatMap((range) => {
    const count = Math.max(Number(range.to) - Number(range.from) + 1, 1);

    return Array.from({ length: count }, () => Number(range.amount));
  });

const countValues = (values: number[]) =>
  values.reduce<Record<number, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

export const GameTabContent: FC<GameTabContentProps> = ({
  gameId,
  pointRanges,
}) => {
  const {
    data: results,
    isLoading,
    error,
    refetch,
  } = useGetResultsByGameIdQuery(gameId, {
    refetchOnMountOrArgChange: true,
  });
  const [updatePoints, { isLoading: isSaving }] =
    useUpdateStudentPointsMutation();
  const { showSnackbar } = useSnackbar();

  const pointSlots = expandPointSlots(pointRanges);
  const pointOptions = Array.from(new Set(pointSlots)).sort((a, b) => b - a);
  const availableByPoint = countValues(pointSlots);
  const usedByPoint = countValues(
    results?.data?.map((item) => Number(item.points ?? 0)).filter(Boolean) ??
      [],
  );

  const handleSelect = async (
    userId: number,
    nextPoints: number,
    currentPoints: number,
  ) => {
    if (nextPoints === currentPoints) return;

    try {
      await updatePoints({ gameId, userId, points: nextPoints }).unwrap();
      showSnackbar('Очки обновлены', 'success');
      refetch();
    } catch (err: any) {
      showSnackbar(err?.data?.error ?? 'Ошибка при обновлении очков', 'error');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorAlert message="Ошибка при загрузке данных" />;

  return (
    <Stack sx={{ width: '100%', height: '100%', gap: 2 }}>
      <TableContainer
        component={Paper}
        sx={{
          background: '#C0CEFF12',
          borderRadius: '12px',
          border: 0,
          height: 'fit-content',
        }}
      >
        <Table stickyHeader>
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
              <TableCell>ID ученика</TableCell>
              <TableCell>Имя / телефон</TableCell>
              <TableCell>Очки</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {results?.data?.map((item, index: number) => {
              const displayName = item.user.tgName
                ? `@${item.user.tgName}`
                : item.user.phone_number;
              const currentPoints = Number(item.points ?? 0);

              return (
                <TableRow
                  key={`${item.user.id}-${index}`}
                  sx={{
                    height: 'fit-content',
                    background: index % 2 === 0 ? '#111520' : '#C0CEFF0A',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell sx={{ color: '#DCE0ED' }}>
                    {item.user.id}
                  </TableCell>
                  <TableCell sx={{ color: '#DCE0ED' }}>
                    {displayName ?? '-'}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={1} flexWrap="wrap">
                      <Chip
                        label="0"
                        clickable
                        color={currentPoints === 0 ? 'primary' : 'default'}
                        disabled={isSaving}
                        onClick={() =>
                          handleSelect(item.user.id, 0, currentPoints)
                        }
                        sx={{
                          color: '#fff',
                          '&.MuiChip-root': {
                            color: '#fff',
                          },
                        }}
                      />
                      {pointOptions.map((points) => {
                        const available = availableByPoint[points] ?? 0;
                        const used = usedByPoint[points] ?? 0;
                        const isSelected = currentPoints === points;
                        const disabled =
                          isSaving || (!isSelected && used >= available);
                        const remaining = isSelected
                          ? available - used
                          : available - used;

                        return (
                          <Chip
                            key={points}
                            label={`${points} (${Math.max(remaining, 0)})`}
                            clickable
                            color={isSelected ? 'primary' : 'default'}
                            disabled={disabled}
                            onClick={() =>
                              handleSelect(item.user.id, points, currentPoints)
                            }
                            sx={{
                              color: '#fff',
                              '&.MuiChip-root': {
                                color: '#fff',
                              },
                            }}
                          />
                        );
                      })}
                      {pointOptions.length === 0 && (
                        <Typography sx={{ color: '#DCE0ED' }}>
                          В мероприятии не задана шкала очков
                        </Typography>
                      )}
                    </Stack>
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
