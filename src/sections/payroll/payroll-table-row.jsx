// payroll-table-row.jsx
import axios from 'axios';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  avatarUrl,
  handleClick,
  selected,
}) {
  const [employee, setEmployee] = useState(null);
  const baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5050'
      : 'https://hrmbackend-x4ea.onrender.com';
  axios.defaults.baseURL = baseURL;

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`/api/employees/${id}`);
        const { data } = response;
        setEmployee(data || {});
        // Check if the status code is not in the range 200-299
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
  const Navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const MySwal = withReactContent(Swal);

  const handleDeleteUser = async () => {
    if (!id) {
      console.error('Invalid user id:', id);
      return;
    }

    // Display a confirmation modal
    MySwal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณจะไม่สามารถกู้คืนได้อีก!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Deleting user with id:', id);

        try {
          const response = await axios.delete(`/api/employees/${id}`);

          if (response.status !== 200) {
            console.error('Error deleting user:', response.status, response.statusText);
          } else {
            console.log('Successfully deleted user');
            MySwal.fire({
              icon: 'success',
              title: 'User deleted successfully!',
            });
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    });
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditClick = () => {
    handleCloseMenu();
    Navigate(`/edit-employee/${id}`, { state: { employee } });
  };
  const handleMoreInfoMenu = () =>{
    Navigate(`/info/${id}`, {state: {employee}});
  }

  if (!employee) {
    return null; // You may choose to render a loading indicator while fetching data
  }
  const basesalary = Number(employee?.payrollInformation?.salary) || 0;
  const totalbonus = Number(employee?.specialWorkHistory?.bonus) || 0;
  const taxDeduction = Number(employee?.payrollInformation?.taxDeduction) || 0;
  const total = (basesalary + totalbonus) - taxDeduction
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={employee?.personalInformation?.firstName} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {employee?.personalInformation?.firstName} {employee?.personalInformation?.lastName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{employee?.employmentInformation?.employmentType}</TableCell>
        <TableCell>{employee?.employmentInformation?.position}</TableCell>
        <TableCell>{employee?.payrollInformation?.salary}</TableCell>
        <TableCell>{employee?.payrollInformation?.taxDeduction}</TableCell>
        <TableCell>{employee?.specialWorkHistory?.bonus}</TableCell>
        <TableCell>{total}</TableCell>
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
        
        <MenuItem onClick={handleMoreInfoMenu}>
          <Iconify icon="eva:info-fill" sx={{ mr: 2 }} />
          MoreInfo
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
  id: PropTypes.string,
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
