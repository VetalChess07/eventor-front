import {
  BaseQueryFn,
  createApi,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import {
  CategorySummaryItem,
  ResultUsers,
  SuccessSummaryItem,
} from '../types/result.types';
import { baseQuery } from '@/shared/api/baseQuery';
import { ApiError, DefaulResponse } from '@/shared/types/api';

interface UpdatePointsRequest {
  gameId: number;
  userId: number;
  points: number;
}

export const resultsApi = createApi({
  reducerPath: 'resultsApi',
  baseQuery: baseQuery as BaseQueryFn<string | FetchArgs, unknown, ApiError>,
  tagTypes: ['Results'],
  endpoints: (builder) => ({
    getSuccessSummary: builder.query<DefaulResponse<SuccessSummaryItem[]>, void>(
      {
        query: () => '/results/success-summary',
        providesTags: ['Results'],
      },
    ),
    getCategorySummary: builder.query<
      DefaulResponse<CategorySummaryItem[]>,
      void
    >({
      query: () => '/results/category-summary',
      providesTags: ['Results'],
    }),
    getResultsByGameId: builder.query<DefaulResponse<ResultUsers[]>, number>({
      query: (gameId) => `/results/${gameId}/admin`,
      providesTags: ['Results'],
    }),
    updateStudentPoints: builder.mutation<ResultUsers, UpdatePointsRequest>({
      query: (body) => ({
        url: 'games/user-points',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Results'],
    }),
    getResultsByGameExcel: builder.mutation<Blob, { gameId: number }>({
      query: ({ gameId }) => ({
        url: `results/game/${gameId}/report/xlsx`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    removeResultsByGameId: builder.mutation<
      { deletedCount: number },
      { gameId: number }
    >({
      query: (body) => ({
        url: 'results/remove-game-by-id/',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Results'],
    }),
  }),
});

export const {
  useGetSuccessSummaryQuery,
  useGetCategorySummaryQuery,
  useGetResultsByGameIdQuery,
  useUpdateStudentPointsMutation,
  useRemoveResultsByGameIdMutation,
  useGetResultsByGameExcelMutation,
} = resultsApi;
