// edit-employee-page
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';


const EditEmployeePage = () => {
  
  const theme = useTheme();
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    personalInformation: {
      firstName: '',
      lastName: '',
      address: '',
      nationalID: '',
      phoneNumber: '',
      email: '',
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
  useEffect(() => {
    const fetchEmployeeData = async () => {
      const baseURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5050'
        : 'https://hrmbackend-x4ea.onrender.com';
    axios.defaults.baseURL = baseURL;
      try {
        if (employeeId) {
          const response = await axios.get(`/api/employees/${employeeId}`);
          setEmployeeData(response.data || {});
        } else {
          console.warn('Employee ID is undefined. Skipping request.');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleChange = (event, section, field) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: event.target.value,
      },
    }));
  };

  const handleEditEmployee = async () => {
    try {
      // eslint-disable-next-line
      const { _id, ...dataToSend } = employeeData;

      // Format date strings before sending to the server
      const formattedEmployeeData = {
        ...dataToSend,
        employmentInformation: {
          ...dataToSend.employmentInformation,
          startDate: new Date(dataToSend.employmentInformation.startDate).toISOString().split('T')[0],
          // Add similar formatting for other date fields
        },
        // Format other date fields in a similar way
      };

      const response = await axios.put(`/api/employees/${employeeId}`, formattedEmployeeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('Employee updated successfully!');
        navigate('/payroll');
      } else {
        console.error('Error updating employee:', response.data);
      }
    } catch (error) {
      console.error('Axios request error:', error);
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
          <Typography variant="h4">Edit Employee</Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              เแก้ไขข้อมูลพนักงาน
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
              label="Lastname"
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
            <TextField
              required
              name="type"
              label="Type"
              value={employeeData.employmentInformation?.employmentType}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  employmentInformation: {
                    ...prevData.employmentInformation,
                    employmentType: e.target.value,
                  },
                }))
              }
            />
            <FormControl fullWidth>
              <TextField
                select
                label="Position"
                value={employeeData.employmentInformation?.position}
                onChange={(e) => handleChange(e, 'employmentInformation', 'position')}
              >
                <MenuItem value="Programmer">Programmer</MenuItem>
                <MenuItem value="Senior Programmer">Senior Programmer</MenuItem>
                <MenuItem value="System Analyst">System Analyst</MenuItem>
                <MenuItem value="System Engineer">System Engineer</MenuItem>
                <MenuItem value="Tester">Tester</MenuItem>
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="IT Support/Help Desk/Administrator">IT Support/Help Desk/Administrator</MenuItem>
                <MenuItem value="Software Engineer	">Software Engineer</MenuItem>

              </TextField>
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
              name="taxDeduction"
              label="Tax Deduction"
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
              name="socialSecurity"
              label="Social Security"
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


};

export default EditEmployeePage;
