import axios from 'axios';
// ----sweetalert2
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReactContent from 'sweetalert2-react-content'

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

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { setUser } from 'src/redux/userAction';

import Logo from 'src/components/logo';

export default function AddEmployee() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();


  const [employeeData, setEmployeeData] = useState({
    personalInformation: {
      firstName: '',
      lastName: '',
      address: '',
      nationalID: '',
      phoneNumber: '',
      email: '',
      image: '',
    },
    employmentInformation: {
      position: '',
      startDate: '',
      employmentType: '',
      workSchedule: '',
      leaveHistory: [],
    },
    payrollInformation: {
      salary: 0,
      taxDeduction: 0,
      socialSecurity: 0,
      overtime: 0,
      payHistory: [],
    },
    paymentInformation: {
      paymentDate: '',
      paymentMethod: '',
    },
    deductions: {
      tax: 0,
      socialSecurity: 0,
      loanRepayment: 0,
    },
    specialWorkHistory: {
      bonus: 0,
      allowance: 0,
    },
    adjustments: [],
  });

  const baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5050'
      : 'https://hrmbackend-x4ea.onrender.com';
  axios.defaults.baseURL = baseURL;
  const loggedInUser = useSelector((state) => state?.users);
  console.log('Logged In User:', loggedInUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/');
        dispatch(setUser(response.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch data only if loggedInUser is undefined or incomplete
    if (!loggedInUser || !loggedInUser.length) {
      fetchData();
    }
  }, [loggedInUser, dispatch]);

  
  
  


  const handleAddEmployee = async () => {
    // Check if the required fields are NOT filled in
    if (!employeeData.personalInformation?.firstName || !employeeData.personalInformation?.lastName) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกข้อมูลให้ครบ',
      });
    } else {
      // Rest of the code for submitting the form

      const MySwal = withReactContent(Swal);

      try {
        const response = await axios.post('/api/employees', employeeData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check for a successful response (2xx status codes)
        if (response.status >= 200 && response.status < 300) {
          MySwal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          router.push('/payroll');
        }
      } catch (error) {
        // Handle Axios request errors
        console.error('Axios request error:', error);
        // You might want to show an error message to the user
      }
    }
  };


  const handleChangeType = (event) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      employmentInformation: {
        ...prevData.employmentInformation,
        employmentType: event.target.value,
      },
    }));
  };

  const handleChange = (event) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      employmentInformation: {
        ...prevData.employmentInformation,
        position: event.target.value,
      },
    }));
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
              เพิ่มพนักงาน
            </Typography>
          </Divider>

          <Stack spacing={3}>
            <TextField
              required
              name="firstname"
              label="First Name"
              value={employeeData.personalInformation?.firstName}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  personalInformation: {
                    ...prevData.personalInformation,
                    firstName: e.target.value,
                  },
                }))
              }
            />
            <TextField
              required
              name="lastname"
              label="Last Name"
              value={employeeData.personalInformation?.lastName}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  personalInformation: {
                    ...prevData.personalInformation,
                    lastName: e.target.value,
                  },
                }))
              }
            />

            <FormControl fullWidth>
              <TextField
                select
                label="Type"
                value={employeeData.employmentInformation?.employmentType}
                onChange={handleChangeType}
              >
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="other">other</MenuItem>
              </TextField>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employeeData.employmentInformation?.position}
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
              required
              name="salary"
              label="Salary"
              type="number"
              value={employeeData.payrollInformation?.salary}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  payrollInformation: {
                    ...prevData.payrollInformation,
                    salary: e.target.value,
                  },
                }))
              }
            />
            <TextField
              required
              name="taxDeduction"
              label="taxDeduction"
              value={employeeData.payrollInformation?.taxDeduction}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  payrollInformation: {
                    ...prevData.payrollInformation,
                    taxDeduction: e.target.value,
                  },
                }))
              }
            />
            <TextField
              required
              name="socialSecurity"
              label="social Security"
              value={employeeData.payrollInformation?.socialSecurity}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  payrollInformation: {
                    ...prevData.payrollInformation,
                    socialSecurity: e.target.value,
                  },
                }))
              }
            />
            <TextField
              name="specialWorkHistory"
              label="bonus"
              value={employeeData.specialWorkHistory?.bonus}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  specialWorkHistory: {
                    ...prevData.specialWorkHistory,
                    bonus: e.target.value,
                  },
                }))
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
      </Stack >
    </Box >
  );
}
