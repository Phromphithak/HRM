import  axios  from 'axios'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const UserRedux = useSelector((state) => state?.user.email);
  const [localUser, setLocalUser] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState('');  // Add this line
  const location = useLocation();
  useEffect(() => {
    const finduser = async () =>{
      try {
        const baseURL =
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:5050'
              : 'https://hrmbackend-x4ea.onrender.com';
          axios.defaults.baseURL = baseURL;
          const response = await axios.get('/api/users/');
          const userData = response.data;
          setLocalUser(userData);
          const query = new URLSearchParams(location.search);
          const loggedInUserIdParam = query.get('loggedInUserId');
          if(UserRedux){
          setLoggedInUserId(UserRedux)
          }else{
            console.log('no data : ', loggedInUserIdParam);
          }
        }catch(error){
        console.error('User not define : ',error)
      }
    }
    finduser();
  }, [location.search, UserRedux]);
  const loggedInUser = localUser.find((userData) => userData.email === loggedInUserId);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={loggedInUser?.profileImage}
          alt={loggedInUser?.fullName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {loggedInUser?.fullName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {loggedInUser?.fullName} {(`(${loggedInUser?.role})`)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {loggedInUser?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
