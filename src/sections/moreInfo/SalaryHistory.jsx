import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Box,
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';


const SalaryHistory = ({ employeeData }) => {
  console.log('EmployeeData : ', employeeData)
  const { payrollInformation } = employeeData;
  const hasPayHistory = payrollInformation && payrollInformation.payHistory && payrollInformation.payHistory.length > 0;

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Salary History
      </Typography>
      {hasPayHistory ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Overtime</TableCell>
                <TableCell>Tax Deduction</TableCell>
                <TableCell>Net Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollInformation.payHistory.map((historyItem, index) => (
                <TableRow key={index}>

                  <Link to={`SalarySlip/${index}`} employeeData={employeeData}>
                    <TableCell>{historyItem?.date}</TableCell>
                  </Link>
                  
                  <TableCell>{historyItem?.amount}</TableCell>
                  <TableCell>{historyItem?.overtime}</TableCell>
                  <TableCell>{historyItem?.taxDeduction}</TableCell>
                  <TableCell>{historyItem?.netSalary}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" p={2}>
          <Typography>No salary history available.</Typography>
        </Box>
      )}
    </div>
  );
};

SalaryHistory.propTypes = {
  employeeData: PropTypes.shape({
    payrollInformation: PropTypes.shape({
      salary: PropTypes.number.isRequired,
      taxDeduction: PropTypes.number.isRequired,
      socialSecurity: PropTypes.number.isRequired,
      overtime: PropTypes.number.isRequired,
      payHistory: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string.isRequired,
          basicSalary: PropTypes.number.isRequired,
          overtime: PropTypes.number.isRequired,
          taxDeduction: PropTypes.number.isRequired,
          netSalary: PropTypes.number.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default SalaryHistory;
