import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

export default function AddEmployee() {
  const theme = useTheme();
  const router = useRouter();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    phonenumber:'',
    isVerified: false,
    status: '',
    avatarUrl: '',
    salary: 0,
  });

  const handleAddEmployee = async () => {
    try {
      const response = await fetch('http://localhost:5050/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        router.push('/user');
      } else {
        // Handle errors here
      }
    } catch (error) {
      // Handle API request errors here
    }
  };

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
              OR
            </Typography>
          </Divider>

          <Stack spacing={3}>
            <TextField
              name="name"
              label="Name"
              value={employeeData.name}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, name: e.target.value })
              }
            />
            <TextField
              name="email"
              label="Email"
              value={employeeData.email}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, email: e.target.value })
              }
            />
            <TextField
              name="phonenumber"
              label="Phonenumber"
              value={employeeData.phonenumber}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, phonenumber: e.target.value })
              }
            />
            <TextField
              name="position"
              label="Position"
              value={employeeData.position}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, position: e.target.value })
              }
            />
            <TextField
              name="isVerified"
              label="Verified"
              value={employeeData.isVerified}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, isVerified: e.target.value })
              }
            />
            <TextField
              name="status"
              label="Status"
              value={employeeData.status}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, status: e.target.value })
              }
            />
            <TextField
              name="avatarUrl"
              label="Avatar URL"
              value={employeeData.avatarUrl}
              onChange={(e) =>
                setEmployeeData({ ...employeeData, avatarUrl: e.target.value })
              }
            />
            <TextField
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
            onClick={handleAddEmployee}
          >
            Save
          </LoadingButton>
          </Stack>

          
        </Card>
      </Stack>
    </Box>
  );
}
