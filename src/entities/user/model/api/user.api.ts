import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/shared/api/baseQuery';

import { ApiError, DefaulResponse } from '@/shared/types/api';
import { User, UserByGameID, UserStatus } from '../types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<
      DefaulResponse<User[]>,
      { limit?: number; page?: number }
    >({
      query: ({ limit = 10, page = 1 }) => ({
        url: `users/?limit=${limit}&page=${page}`,
      }),
      providesTags: ['User'],
    }),

    getAllUsersReport: builder.mutation<
      Blob,
      { limit?: number; page?: number }
    >({
      query: () => ({
        url: `users/report/xlsx`,
        responseHandler: (response) => response.blob(),
      }),
    }),

    getUsersByGameReport: builder.mutation<
      Blob,
      { gameId: number; limit?: number; page?: number }
    >({
      query: ({ gameId }) => ({
        url: `users/report/xlsx/${gameId}`,
        responseHandler: (response) => response.blob(),
      }),
    }),

    getUsersByGame: builder.query<
      DefaulResponse<UserByGameID[]>,
      { gameId: number }
    >({
      query: ({ gameId }) => ({
        url: `users/by-game/${gameId}`,
      }),
      providesTags: ['User'],
    }),

    searchUser: builder.mutation<
      { data: User },
      { tgName?: string; phone_number?: string }
    >({
      query: (body) => ({
        url: '/users/search-user',
        method: 'PUT',
        body,
      }),
    }),

    createUser: builder.mutation<
      DefaulResponse<User>,
      {
        phone_number?: string;
        tgName?: string;
        gameId?: number | null;
        number_ticket?: number;
        points?: number;
      }
    >({
      query: (formData) => ({
        url: 'users/create-and-add-user-game',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<
      DefaulResponse<User>,
      Partial<User> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation<DefaulResponse, { id: number }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    setUserBanStatus: builder.mutation<
      DefaulResponse<User>,
      { userId: number; status: UserStatus }
    >({
      query: ({ userId, status }) => ({
        url: `users/set-user-status`,
        method: 'PUT',
        body: { userId, status },
      }),
      invalidatesTags: ['User'],
    }),

    addUserByGame: builder.mutation<
      any,
      { userId: number; gameId: number; number_ticket?: number; points?: number }
    >({
      query: (body) => ({
        url: '/games/add-user-by-game',
        method: 'POST',
        body,
      }),
    }),

    removeUserFromGame: builder.mutation<
      any,
      { userId: number; gameId: number }
    >({
      query: (body) => ({
        url: '/games/remove-user-by-game',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<
      DefaulResponse<User & { token: string }>,
      { login: string; password: string }
    >({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export type DeleteUserMutationFn = ReturnType<typeof useDeleteUserMutation>[0];
export type CreateUserMutationFn = ReturnType<typeof useCreateUserMutation>[0];
export type UpdateUserMutationFn = ReturnType<typeof useUpdateUserMutation>[0];

export const {
  useGetAllUsersQuery,
  useGetUsersByGameQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSetUserBanStatusMutation,
  useSearchUserMutation,
  useAddUserByGameMutation,
  useRemoveUserFromGameMutation,
  // Новые хуки для отчетов
  useGetAllUsersReportMutation,
  useGetUsersByGameReportMutation,
  useLoginMutation,
} = userApi;
