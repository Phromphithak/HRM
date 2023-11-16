import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  position,
  email,
  isVerified,
  status,
  handleClick,
  salary,
  avatarUrl,
}) {
  
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/employees/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        console.error('Error deleting user:', response.status, response.statusText);
      } else {
        // ทำอะไรสักอย่างหลังจากการลบผู้ใช้สำเร็จ
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const handleUpdateUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/employees/${id}`, {
        method: 'PATCH', // คุณอาจจะต้องเปลี่ยนเป็น 'PATCH' หากต้องการทำการอัปเดต
        // เพิ่มข้อมูลที่ต้องการอัปเดตใน body
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'New Name', // เปลี่ยนเป็นข้อมูลที่ต้องการอัปเดต
          position: 'New Position', // เปลี่ยนเป็นข้อมูลที่ต้องการอัปเดต
          salary: 10000 // เปลี่ยนเป็นข้อมูลที่ต้องการอัปเดต
        })
      });
  
      if (!response.ok) {
        console.error('Error updating user:', response.status, response.statusText);
      } else {
        // ทำอะไรสักอย่างหลังจากการอัปเดตผู้ใช้สำเร็จ
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
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
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{position}</TableCell>
        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>
        <TableCell>{salary}</TableCell>
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
        <MenuItem onClick={handleUpdateUser}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
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
