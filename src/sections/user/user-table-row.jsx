import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function UserTableRow({
  phonenumber,
  id, // Assuming id is the MongoDB id
  avatarUrl,
  handleClick,
  isVerified,
  name,
  email,
  position,
  selected,
  status,
  salary,
}) {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const handleDeleteUser = async () => {
    if (!id) {
      console.error('Invalid user id:', id);
      return;
    }

    console.log('Deleting user with id:', id);

    try {
      const response = await axios.delete(`/api/employees/${id}`);

      if (response.status !== 200) {
        console.error('Error deleting user:', response.status, response.statusText);
      } else {
        console.log('Successfully deleted user');
        router.reload('/user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleEditClick = () => {
    handleCloseMenu();
    Navigate(`/edit-employee/${id}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap >
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{position}</TableCell>
        <TableCell>{salary}</TableCell>
        <TableCell>{phonenumber}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>
            {status}
          </Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>



      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }} >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>

      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string,
  phonenumber: PropTypes.any,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
  position: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  salary: PropTypes.any,
};
