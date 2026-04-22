import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  IconButton,
  Stack,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { Game } from '@/entities/games';
import { GameSkeleton } from '../GameSkeleton/GameSkeleton';
import { statusKeys } from '@/entities/games/model/conts/statusKeys';
import { useUpdateGameStatusMutation } from '@/entities/games/model/api/game.api';
import { useSnackbar } from '@/shared/ui/Snackbar/Snackbar';
import { UpdateGameModal } from '../UpdateGameModal/UpdateGameModal';
import { CiEdit } from 'react-icons/ci';

import type { ApiError } from '@/shared/types/api';
import { DeleteGameModal } from '../DeleteGameModal/DeleteGameModal';
import { FiTrash2 } from 'react-icons/fi';
import coin from '@/shared/assets/icons/logo-single.svg';
import { gameCategoryLabels } from '@/entities/games/model/conts/categories';

interface GamesListProps {
  games?: Game[] | null;
  isLoading: boolean;
  refetch: () => void;
}

export const GamesList = ({ games, isLoading, refetch }: GamesListProps) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const { showSnackbar } = useSnackbar();
  const [updateGameStatus, { isLoading: isUpdating }] =
    useUpdateGameStatusMutation();

  const openUpdateModal = (game: Game) => {
    setSelectedGame(game);
    setIsOpenModalUpdate(true);
  };

  const closeUpdateModal = () => {
    setSelectedGame(null);
    setIsOpenModalUpdate(false);
  };

  const openDeleteModal = (game: Game) => {
    setSelectedGame(game);
    setIsOpenModalDelete(true);
  };

  const closeDeleteModal = () => {
    setSelectedGame(null);
    setIsOpenModalDelete(false);
  };

  const handleStatusToggle = async (game: Game) => {
    const newStatus = game.status === 'ACTIVE' ? 'FINISHED' : 'ACTIVE';
    try {
      await updateGameStatus({
        gameId: Number(game.id),
        status: newStatus,
      }).unwrap();
      showSnackbar(
        `Статус мероприятия ${game.id} обновлен на ${newStatus}`,
        'success',
      );
      refetch();
    } catch (err) {
      const error = err as ApiError;
      showSnackbar(
        error?.data?.error ?? 'Ошибка при обновлении статуса',
        'error',
      );
    }
  };

  if (isLoading) return <GameSkeleton />;

  return (
    <>
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
              },
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Доступные очки</TableCell>
              <TableCell>Позиций в шкале</TableCell>
              <TableCell>Дата начала</TableCell>
              <TableCell>Дата окончания</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Изменить статус</TableCell>
              <TableCell>Управление</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {games?.map((game, index) => (
              <TableRow
                key={game?.id}
                sx={{
                  background: index % 2 === 0 ? '#111520' : '#C0CEFF0A',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  {game.id}
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 500, textAlign: 'center' }}
                  >
                    {game.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  {gameCategoryLabels[game.category] ??
                    gameCategoryLabels.other}
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 200,
                    }}
                  >
                    {game.description ?? '-'}
                  </Typography>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  <Stack gap={2}>
                    {game?.prizes?.map((prize, i) => (
                      <Typography
                        key={`${game?.id}-${i}`}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                        }}
                      >
                        {prize.from} - {prize.to} : {prize.amount}
                        <Box
                          component="img"
                          src={coin}
                          width={18}
                          height={18}
                        />
                      </Typography>
                    )) ?? '-'}
                  </Stack>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  {game.countWinner ?? '-'}
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  {dayjs(game.date_start).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  {dayjs(game.date_finish).format('DD.MM.YYYY')}
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle' }}>
                  <Typography
                    sx={{
                      color:
                        game.status === 'ACTIVE'
                          ? 'rgb(72, 117, 185)'
                          : 'rgb(182, 29, 29)',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                    }}
                  >
                    {statusKeys[game.status]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Switch
                      sx={{ margin: '0 auto' }}
                      disabled={isUpdating}
                      checked={game.status === 'ACTIVE'}
                      onChange={() => handleStatusToggle(game)}
                    />
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ verticalAlign: 'middle', textAlign: 'center' }}
                >
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      sx={{
                        background:
                          'linear-gradient(to bottom, #5AA1EF, #4875B9)',
                        color: '#fff',
                      }}
                      onClick={() => openUpdateModal(game)}
                    >
                      <CiEdit />
                    </IconButton>
                    <IconButton
                      sx={{
                        background:
                          'linear-gradient(to bottom, #EF5A5A, #B92929)',
                        color: '#fff',
                      }}
                      onClick={() => openDeleteModal(game)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateGameModal
        open={isOpenModalUpdate}
        onClose={closeUpdateModal}
        game={selectedGame}
        refetch={refetch}
      />

      <DeleteGameModal
        open={isOpenModalDelete}
        onClose={closeDeleteModal}
        game={selectedGame}
        refetch={refetch}
      />
    </>
  );
};
