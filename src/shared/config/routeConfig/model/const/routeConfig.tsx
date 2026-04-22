import { RouteObject } from 'react-router-dom';

import { GamesPageAsync } from '@/pages/Games/GamesPage.async';

import { UsersPageAsync } from '@/pages/UsersPage/UsersPage.async';

import { ResultsPageAsync } from '@/pages/Results/ResultsPage.async';
import { SuccessSummaryPageAsync } from '@/pages/SuccessSummary/SuccessSummaryPage.async';

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import Verify2FAPage from '@/pages/Setup2FA/Verify2FAPage';
import Setup2FAPages from '@/pages/Setup2FA/Setup2FAPages';
import { Layout } from '@/app/providers/layout/Layout';
import { AuthLayout } from '@/app/providers/layout/AuthLayout';
import { LoginForm } from '@/features/user/ui/LoginForm';

export enum AppRoutes {
  LOTOTRONS = 'lototrons',
  NOT_FOUND = 'not_found',
  USERS = 'users',
  RESULT = 'result',
  SUCCESS_SUMMARY = 'success_summary',
  SETUP_2FA = 'setup_2fa',
  VERIFY_2FA = 'verify_2fa',
  AUTH = 'auth',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.AUTH]: '/login',
  [AppRoutes.LOTOTRONS]: '/',
  [AppRoutes.USERS]: '/users',
  [AppRoutes.RESULT]: '/result',
  [AppRoutes.SUCCESS_SUMMARY]: '/success-summary',
  [AppRoutes.SETUP_2FA]: '/2fa',
  [AppRoutes.VERIFY_2FA]: '/verify',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.LOTOTRONS]: {
    path: RoutePath[AppRoutes.LOTOTRONS],
    element: (
      <Layout>
        <GamesPageAsync />
      </Layout>
    ),
  },

  [AppRoutes.USERS]: {
    path: RoutePath[AppRoutes.USERS],
    element: (
      <Layout>
        <UsersPageAsync />
      </Layout>
    ),
  },

  [AppRoutes.RESULT]: {
    path: RoutePath[AppRoutes.RESULT],
    element: (
      <Layout>
        <ResultsPageAsync />
      </Layout>
    ),
  },

  [AppRoutes.SUCCESS_SUMMARY]: {
    path: RoutePath[AppRoutes.SUCCESS_SUMMARY],
    element: (
      <Layout>
        <SuccessSummaryPageAsync />
      </Layout>
    ),
  },

  [AppRoutes.SETUP_2FA]: {
    path: RoutePath[AppRoutes.SETUP_2FA],
    element: (
      <Layout>
        <Setup2FAPages />
      </Layout>
    ),
  },

  [AppRoutes.VERIFY_2FA]: {
    path: RoutePath[AppRoutes.VERIFY_2FA],
    element: (
      <AuthLayout>
        <Verify2FAPage />
      </AuthLayout>
    ),
  },
  [AppRoutes.AUTH]: {
    path: RoutePath[AppRoutes.AUTH],
    element: (
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    ),
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
