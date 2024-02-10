// SalarySlip.jsx
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Paper, Table, TableRow, TableBody, TableCell, TableHead, Container, Typography, TableContainer } from '@mui/material';



const SalarySlip = ({ employeeData }) => {
    const formatDate = (dateString) => dateString; // Your date formatting logic here

    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Salary Slip
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Typography>
                <strong>Name:</strong> {employeeData?.personalInformation.firstName}{' '}
                {employeeData?.personalInformation.lastName}
              </Typography>
              {/* Add more personal information fields as needed */}
            </Paper>
          </Grid>
  
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Employment Information
              </Typography>
              <Typography>
                <strong>Position:</strong> {employeeData?.employmentInformation.position}
              </Typography>
              {/* Add more employment information fields as needed */}
            </Paper>
          </Grid>
        </Grid>
  
        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
          Income Details
        </Typography>
  
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount (THB)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Basic Salary</TableCell>
                <TableCell>{employeeData?.payrollInformation.salary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Earning - Overtime</TableCell>
                <TableCell>{employeeData?.payrollInformation.overtime}</TableCell>
              </TableRow>
              {/* Add more rows for other income items */}
              <TableRow>
                <TableCell>Total Income</TableCell>
                <TableCell>{/* Calculate total income */}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
          Deductions Details
        </Typography>
  
        <TableContainer component={Paper} sx={{ marginTop: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount (THB)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tax Deduction</TableCell>
                <TableCell>{employeeData?.deductions.tax}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Loan Repayment</TableCell>
                <TableCell>{employeeData?.deductions.loanRepayment}</TableCell>
              </TableRow>
              {/* Add more rows for other deduction items */}
              <TableRow>
                <TableCell>Total Deductions</TableCell>
                <TableCell>{/* Calculate total deductions */}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Salary</TableCell>
                <TableCell>{/* Calculate net salary */}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
  
        <Typography variant="caption" sx={{ marginTop: 2 }}>
          Salary Slip Issued on: {formatDate(employeeData?.paymentInformation.paymentDate)}
        </Typography>
      </Container>
    );
  };
  
  SalarySlip.propTypes = {
    employeeData: PropTypes.shape({
      personalInformation: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
      employmentInformation: PropTypes.shape({
        position: PropTypes.string.isRequired,
      }).isRequired,
      payrollInformation: PropTypes.shape({
        salary: PropTypes.number.isRequired,
        overtime: PropTypes.number.isRequired,
        // Add other payroll information properties as needed
      }).isRequired,
      deductions: PropTypes.shape({
        tax: PropTypes.number.isRequired,
        loanRepayment: PropTypes.number.isRequired,
        // Add other deduction properties as needed
      }).isRequired,
      paymentInformation: PropTypes.shape({
        paymentDate: PropTypes.string.isRequired,
        // Add other payment information properties as needed
      }).isRequired,
      // Add other employeeData? properties as needed
    }).isRequired,
  };
  
  export default SalarySlip;
