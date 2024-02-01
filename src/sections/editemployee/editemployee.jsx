// edit-employee-page
import axios from 'axios';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content'
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
import Grid from '@mui/material/Grid';
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
      const MySwal = withReactContent(Swal);
      // eslint-disable-next-line
      const { _id, ...dataToSend } = employeeData;

      const response = await axios.put(`/api/employees/${employeeId}`, employeeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        MySwal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/payroll');
      } else {
        console.error('Error updating employee:', response.data);
      }
    } catch (error) {
      console.error('Axios request error:', error);
    }
  };

  const handlePayHistoryChange = (e, index, field) => {
    const { value } = e.target;

    setEmployeeData((prevData) => {
      const updatedPayHistory = [...prevData.payrollInformation.payHistory];
      updatedPayHistory[index][field] = value;

      return {
        ...prevData,
        payrollInformation: {
          ...prevData.payrollInformation,
          payHistory: updatedPayHistory,
        },
      };
    });
  };

  const handleAddPayHistory = () => {
    setEmployeeData((prevData) => {
      const updatedPayHistory = [
        ...prevData.payrollInformation.payHistory,
        { date: '', amount: 0 },
      ];

      return {
        ...prevData,
        payrollInformation: {
          ...prevData.payrollInformation,
          payHistory: updatedPayHistory,
        },
      };
    });
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
            maxWidth: 800,
          }}
        >
          <Typography variant="h4">Edit Employee</Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              แก้ไขข้อมูลพนักงาน
            </Typography>
          </Divider>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ข้อมูลบุคคล
                  </Typography>
                </Divider>

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
                  name="address"
                  label="Address"
                  value={employeeData.personalInformation?.address}
                  onChange={(e) =>
                    setEmployeeData((prevData) => ({
                      ...prevData,
                      personalInformation: {
                        ...prevData.personalInformation,
                        address: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  required
                  name="nationalID"
                  label="NationalID"
                  value={employeeData.personalInformation?.nationalID}
                  onChange={(e) =>
                    setEmployeeData((prevData) => ({
                      ...prevData,
                      personalInformation: {
                        ...prevData.personalInformation,
                        nationalID: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  required
                  name="phoneNumber"
                  label="Phone"
                  value={employeeData.personalInformation?.phoneNumber}
                  onChange={(e) =>
                    setEmployeeData((prevData) => ({
                      ...prevData,
                      personalInformation: {
                        ...prevData.personalInformation,
                        phoneNumber: e.target.value,
                      },
                    }))
                  }
                />
                <TextField
                  required
                  name="email"
                  label="Email"
                  value={employeeData.personalInformation?.email}
                  onChange={(e) =>
                    setEmployeeData((prevData) => ({
                      ...prevData,
                      personalInformation: {
                        ...prevData.personalInformation,
                        email: e.target.value,
                      },
                    }))
                  }
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ข้อมูลพนักงาน
                  </Typography>
                </Divider>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Type"
                    value={employeeData.employmentInformation?.employmentType}
                    onChange={(e) => handleChange(e, 'employmentInformation', 'employmentType')}
                  >
                    <MenuItem value="Full-Time">Full-Time</MenuItem>
                    <MenuItem value="Part-Time">Part-Time</MenuItem>
                    <MenuItem value="other">other</MenuItem>
                  </TextField>
                </FormControl>

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
                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                  </TextField>
                </FormControl>


              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ข้อมูลการจ่ายเงินเดือน
                  </Typography>
                </Divider>
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
                {employeeData.payrollInformation?.payHistory.map((history, index) => (
                  <div key={index}>
                    <Stack spacing={3}>

                      <TextField
                        name={`payHistoryDate${index}`}
                        label="Pay History Date"
                        type="date"
                        value={history.date}
                        onChange={(e) => handlePayHistoryChange(e, index, 'date')}
                      />
                      <TextField
                        name={`payHistoryAmount${index}`}
                        label="Pay History Amount"
                        type="number"
                        value={history.amount}
                        onChange={(e) => handlePayHistoryChange(e, index, 'amount')}
                      />
                    </Stack>
                  </div>
                ))}
                <LoadingButton onClick={handleAddPayHistory}>Add Pay History</LoadingButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Divider sx={{ my: 3 }}>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ข้อมูลจ่ายเงินพิเศษ
                  </Typography>
                </Divider>
                <TextField
                  name="specialWorkHistory"
                  label="Bonus"
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
                <TextField
                  name="allowance"
                  label="Allowance"
                  value={employeeData.specialWorkHistory?.allowance}
                  onChange={(e) =>
                    setEmployeeData((prevData) => ({
                      ...prevData,
                      specialWorkHistory: {
                        ...prevData.specialWorkHistory,
                        allowance: e.target.value,
                      },
                    }))
                  }
                />
              </Stack>

            </Grid>

          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <br />
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

          </Grid>

        </Card>
      </Stack>
    </Box>
  );
};

export default EditEmployeePage;
