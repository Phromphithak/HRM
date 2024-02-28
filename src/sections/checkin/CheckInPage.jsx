import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Table ,Button,Select, MenuItem, TableRow,TextField, TableHead, TableBody, TableCell, Typography, TableContainer, } from '@mui/material';

import AttendanceStatusPage from './AttendanceStatusPage';


const CheckInPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [checkInMessage, setCheckInMessage] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('เช็คชื่อ');
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Fetch employee data from your API
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('/api/employees'); // Adjust the API endpoint
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleCheckboxChange = (employeeId) => {
    // Toggle the selection status of the employee
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId);
      }
      return [...prevSelected, employeeId];
    });
  };

  const handleCheckIn = async () => {
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5050'
        : 'https://hrmbackend-x4ea.onrender.com';
    axios.defaults.baseURL = baseURL;

    try {
      console.log('Submitting form...');
      // Send a request to check in selected employees with the current time
      const currentTime = new Date().toLocaleTimeString();
      const checkInData = {
        employeeIds: selectedEmployees,
        checkInTime: currentTime,
        attendanceStatus,
        reason,
      };

      console.log('Check-in data:', checkInData);

      const response = await axios.post('/api/Checkin/checkIn', checkInData); // Adjust the API endpoint

      console.log('Check-in response:', response.data);
      setCheckInMessage('Check-in successful!');
      // You can handle success or show a confirmation message here

      // Clear the selected employees after check-in
      setSelectedEmployees([]);
      setAttendanceStatus('เช็คชื่อ');
      setReason('');
    } catch (error) {
      console.error('Error checking in employees:', error);
      setCheckInMessage('Today is  check-in early');
      // You can handle errors or show an error message here
    }
  };

  return (
    <div>
      <Typography variant="h4">เช็คชื่อ (Check-In) Page</Typography>
      <div>
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label htmlFor="attendanceStatus">
          เลือกสถานะการเช็คชื่อ:
          <Select
            id="attendanceStatus" // Add this line
            value={attendanceStatus}
            onChange={(e) => setAttendanceStatus(e.target.value)}
          >
            <MenuItem value="เช็คชื่อ">เช็คชื่อ</MenuItem>
            <MenuItem value="ขาด">ขาด</MenuItem>
            <MenuItem value="ลา">ลา</MenuItem>
            <MenuItem value="มาสาย">มาสาย</MenuItem>
          </Select>
        </label>
      </div>

      <div>
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label htmlFor="reason">
          ระบุเหตุผล:
          <TextField
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Check-In</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee._id}</TableCell>
                <TableCell>{employee.personalInformation.firstName}</TableCell>
                <TableCell>{employee.personalInformation.lastName}</TableCell>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee._id)}
                    onChange={() => handleCheckboxChange(employee._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={handleCheckIn} disabled={selectedEmployees.length === 0}>
        Confirm Check-In
      </Button>
      {checkInMessage && <Typography variant="body1">{checkInMessage}</Typography>}
      <AttendanceStatusPage/>
    </div>
  );
};

export default CheckInPage;
