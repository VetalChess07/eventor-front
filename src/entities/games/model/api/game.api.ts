import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { Game } from '../types/games.types';
import { ApiError, DefaulResponse } from '@/shared/types/api';
import { GameCreateFormData } from '@/entities/games/model/types/games.types';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    getAllGame: builder.query<
      DefaulResponse<Game[]>,
      { limit?: number; page?: number },
      ApiError
    >({
      query: ({ limit = 8, page = 1 }) => ({
        url: `games/?limit=${limit}&page=${page}`,
      }),
      providesTags: [{ type: 'Game' }],
    }),
    deleteGame: builder.mutation<
      DefaulResponse<Game[]>,
      { gameId: number },
      ApiError
    >({
      query: ({ gameId }) => ({
        url: `games/delete/${gameId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Game'],
    }),

    createGame: builder.mutation<void, GameCreateFormData>({
      query: (formData) => ({
        url: 'games/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Game'],
    }),
    updateGame: builder.mutation<
      Game,
      Partial<GameCreateFormData> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `games/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Game'],
    }),

    updateGameStatus: builder.mutation<
      void,
      { gameId: number; status: string }
    >({
      query: ({ gameId, status }) => ({
        url: 'games/update-status',
        method: 'PUT',
        body: { gameId, status },
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});

export type DeleteGameMutationFn = ReturnType<typeof useDeleteGameMutation>[0];

export type CreateGameMutationFn = ReturnType<typeof useCreateGameMutation>[0];

export const {
  useGetAllGameQuery,
  useDeleteGameMutation,
  useCreateGameMutation,
  useUpdateGameMutation,
  useUpdateGameStatusMutation,
} = gameApi;
