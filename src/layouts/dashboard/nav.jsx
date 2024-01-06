
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const upLg = useResponsive('up', 'lg');
  const UserRedux = useSelector((state) => state?.user.email);
  const [localUser, setLocalUser] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');  // Add this line
  const location = useLocation();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const baseURL =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5050'
            : 'https://hrmbackend-x4ea.onrender.com';
        axios.defaults.baseURL = baseURL;

        const response = await axios.get('/api/users/');
        const userData = response.data;
        setLocalUser(userData);

        // Get the loggedInUserId from the query parameter
        const query = new URLSearchParams(location.search);
        const loggedInUserIdParam = query.get('loggedInUserId');
        console.log('loggedInUserIdParam:', loggedInUserIdParam);
        setLoggedInUserId(UserRedux || ''); // Set to empty string if not present
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    authenticateUser();
  }, [location.search, UserRedux]);
  const loggedInUser = localUser.find((userData) => userData.email === loggedInUserId);
  console.log('loggedInUserId:', loggedInUserId);
  console.log('loggedInUser:', loggedInUser);
  const renderAccount = (
    <Stack>
      {loggedInUser && (
        <Box
          sx={{
            my: 3,
            mx: 2.5,
            py: 2,
            px: 2.5,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
          }}
        >
          <Avatar src={loggedInUser?.profileImage} alt="photoURL" />
  
          <Box sx={{ ml: 2 }}>
            <>
              <Typography variant="subtitle2">{loggedInUser?.fullName}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {loggedInUser?.role}
              </Typography>
            </>
          </Box>
        </Box>
      )}
    </Stack>
  );
  

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      {renderAccount}
      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
