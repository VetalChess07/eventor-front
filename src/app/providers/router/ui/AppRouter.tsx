import React, { FC, Suspense, useCallback, useState, useEffect } from 'react';
import { Routes, Route, RouteObject, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

import { routeConfig } from '@/shared/config/routeConfig/model/const/routeConfig';
import { Loader } from '@/shared/ui/Loader/Loader';
import { checkIsAdmin } from '@/features/checkISAdmin';
import { RoutePath } from '@/shared/config/routeConfig';
import { useAppDispatch } from '@/shared/lib/hooks/redux/useAppDispatch';
import { setUser } from '@/entities/user/model/slice/userSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    checkIsAdmin({
      setIsLoading,
      setError: () => {},
      errorCallback: () => {
        navigate(RoutePath.auth);
      },
      error2FACallback: () => {
        navigate(RoutePath.verify_2fa);
      },
      noUserInfoCallback: () => {
        navigate(RoutePath.auth);
      },
      successCallback: (data) => {
        dispatch(setUser(data));
      },
    });
  }, []);

  if (isLoading) {
    return (
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100dvh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </Stack>
    );
  }

  return <>{children}</>;
};

const AppRouter: FC = () => {
  const renderWithWrapper = useCallback((route: RouteObject) => {
    const routePath = route.path;
    const isPublicRoute =
      routePath === RoutePath.auth || routePath === RoutePath.verify_2fa;

    const content = (
      <Suspense
        fallback={
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              minHeight: '100dvh',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loader />
          </Stack>
        }
      >
        {route.element}
      </Suspense>
    );

    const element = isPublicRoute ? (
      content
    ) : (
      <ProtectedRoute>{content}</ProtectedRoute>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
