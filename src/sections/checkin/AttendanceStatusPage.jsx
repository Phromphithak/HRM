import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,

} from '@mui/material';

const AttendanceStatusPage = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('/api/CheckIn/attendance'); // Adjust the API endpoint
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div>
      <Typography variant="h4">สถานะการเช็คชื่อของพนักงาน</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Attendance Status</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((attendance) => (
              <TableRow key={attendance._id}>
                <TableCell>{attendance.employeeId}</TableCell>
                <TableCell>{attendance.firstName}</TableCell>
                <TableCell>{attendance.lastName}</TableCell>
                <TableCell>{attendance.attendanceStatus}</TableCell>
                <TableCell>{attendance.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AttendanceStatusPage;
