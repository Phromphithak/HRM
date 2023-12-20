import axios from 'axios';
import Swal from 'sweetalert2'
import React, {  useState,useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content'
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

export default function EditEmployeeView() {
  const { employeeId } = useParams();
  const navigate = useNavigate();  // Use useNavigate instead of useRouter
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    phonenumber: '',
    isVerified: false,
    status: '',
    avatarUrl: '',
    salary: 0,
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`/api/employees/${employeeId}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleEditEmployee = async () => {
    axios.defaults.baseURL = 'https://hrmbackend-x4ea.onrender.com';
    const MySwal = withReactContent(Swal);

    try {
      const response = await axios.put(
        `/api/employees/${employeeId}`,
        employeeData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      if (response.status >= 200 && response.status < 300) {
        MySwal.fire({
          icon: 'success',
          title: 'อัปเดตข้อมูลพนักงานสำเร็จ!',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/user');
      } else {
        console.error('Error editing employee:', response.data);
      }
    } catch (error) {
      console.error('Axios request error:', error);

      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while updating employee details.',
      });
    }
  };
  const handleChange = (event) => {
    setEmployeeData({ ...employeeData, position: event.target.value });
  };

  const theme = useTheme();
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

<Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Add Employee</Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              เพิ่มพนักงาน
            </Typography>
          </Divider>

          <Stack spacing={3}>
            <TextField
              required
              name="name"
              label="Name"
              value={employeeData.name}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, name: e.target.value })
              }
            />
            <TextField
              required
              name="email"
              label="Email"
              value={employeeData.email}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, email: e.target.value })
              }
            />
            <TextField
              required
              name="phonenumber"
              label="Phonenumber"
              value={employeeData.phonenumber}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, phonenumber: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employeeData.position}
                label="Position"
                onChange={handleChange}
              >
                <MenuItem value="Programmer">Programmer</MenuItem>
                <MenuItem value="Senior Programmer">Senior Programmer</MenuItem>
                <MenuItem value="System Analyst">System Analyst</MenuItem>
                <MenuItem value="System Engineer">System Engineer</MenuItem>
                <MenuItem value="Tester">Tester</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="IT Support/Help Desk/Administrator">IT Support/Help Desk/Administrator</MenuItem>

              </Select>
            </FormControl>
            <TextField
              name="avatarUrl"
              label="Avatar URL"
              value={employeeData.avatarUrl}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, avatarUrl: e.target.value })
              }
            />
            <TextField
              required
              name="salary"
              label="Salary"
              type="number"
              value={employeeData.salary}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, salary: e.target.value })
              }
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleEditEmployee}
            >
              Save
            </LoadingButton>
          </Stack>


        </Card>
      </Stack>
    </Box>
  );
}
