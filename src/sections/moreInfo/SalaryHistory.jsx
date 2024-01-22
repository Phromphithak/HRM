// SalaryHistory.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Table, TableBody, TableCell, Paper, TableRow, TableContainer, TableHead } from '@mui/material';

const SalaryHistory = ({ salaryHistory }) => (
  <div>
    <Typography variant="h5" gutterBottom>
      Salary History
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryHistory.map((historyItem, index) => (
            <TableRow key={index}>
              <TableCell>{historyItem.date}</TableCell>
              <TableCell>{historyItem.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

SalaryHistory.propTypes = {
  salaryHistory: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SalaryHistory;
