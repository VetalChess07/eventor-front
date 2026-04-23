import { useState, memo } from 'react';
import {
  List,
  ListItem,
  Typography,
  IconButton,
  Stack,
  Box,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { navRoutes } from '@/shared/config/routeConfig';

import { ButtonLogout } from '../ButtonLogout/ButtonLogout';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/storeProvider/config/store';

export const Nav = memo(() => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const search = location.search;

  const is2FA = useSelector((state: RootState) => state.user.data?.is2FA);

  const navLinkItems = is2FA
    ? navRoutes.filter((route) => route.path !== '/2fa')
    : navRoutes;

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 2000,
          backgroundColor: 'var(--secondary-bg)',
          color: 'var(--primary-text-color)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          transition: 'transform .2s ease',
          '&:hover': { transform: 'scale(1.1)' },
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        onClick={() => setOpen(false)}
        sx={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: 'opacity .3s ease, visibility .3s ease',
          zIndex: 99,
          display: { xs: 'block', md: 'none' },
        }}
      />

      <Stack
        component="aside"
        sx={{
          position: { xs: 'fixed', md: 'static' },
          top: 0,
          left: 0,
          height: { xs: '100vh', md: 'auto' },
          width: '250px',
          background: 'var(--secondary-bg)',
          padding: '64px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 100,

          transform: {
            xs: open ? 'translateX(0)' : 'translateX(-110%)',
            md: 'none',
          },
          transition: 'transform .4s cubic-bezier(.4,0,.2,1)',

          boxShadow: {
            xs: '0 20px 60px rgba(0,0,0,0.25)',
            md: 'none',
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: { xs: 'flex', md: 'none' },
            color: 'var(--primary-text-color)',
            backgroundColor: 'var(--secondary-bg)',
            '&:hover': { backgroundColor: 'var(--secondary-bg-hover)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <List
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {navLinkItems.map((route) => (
            <ListItem
              key={route.label}
              disablePadding
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <NavLink
                to={`${route.path}${search}`}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: isActive ? '#fff' : '#4875b9',
                  textDecoration: 'none',
                  fontFamily: 'Inter-Regular',
                  transition: 'all .2s ease',
                  transform: isActive ? 'translateX(4px)' : 'none',
                })}
                onClick={() => setOpen(false)}
              >
                {route.Icon}
                <Typography sx={{ color: 'inherit' }} component="span">
                  {route.label}
                </Typography>
              </NavLink>
            </ListItem>
          ))}
        </List>

        <ButtonLogout />
      </Stack>
    </>
  );
});
