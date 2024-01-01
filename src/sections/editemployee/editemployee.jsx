// edit-employee-page
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditEmployeePage = () => {
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
      try {
        if (employeeId) {
          const response = await axios.get(`https://hrmbackend-x4ea.onrender.com/api/employees/${employeeId}`);
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
      // Remove _id from the data
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
  
      const response = await axios.put(`https://hrmbackend-x4ea.onrender.com/api/employees/${employeeId}`, formattedEmployeeData, {
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
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleEditEmployee}>
        <Stack spacing={3}>
          {Object.keys(employeeData).map((section) =>
            employeeData[section] && typeof employeeData[section] === 'object' ? (
              Object.entries(employeeData[section])
                .filter(([field]) => !field.includes('Date') && Number.isNaN(Number(field)) && field !== '_id' && field !== 'payHistory' && field !== 'leaveHistory')
                .map(([field, value]) => (
                  <TextField
                    key={field}
                    required
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    type={field.includes('Date') ? 'date' : 'text'}
                    value={value}
                    onChange={(e) => handleChange(e, section, field)}
                  />
                ))
            ) : null
          )}
  
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Stack>
      </form>
    </div>
  );
  
  
};  

export default EditEmployeePage;
