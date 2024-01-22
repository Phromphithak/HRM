// moreInfo.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid, Paper } from '@mui/material';

const Extendinfo = ({ employeeData }) => {
  const {
    _id,
    personalInformation,
    employmentInformation,
    payrollInformation,
    paymentInformation,
    deductions,
    specialWorkHistory,
    adjustments,
  } = employeeData;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employee Information
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography>Name: {`${personalInformation.firstName} ${personalInformation.lastName}`}</Typography>
            <Typography>Address: {personalInformation.address}</Typography>
            {/* Add more personal information fields as needed */}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Employment Information
            </Typography>
            <Typography>Position: {employmentInformation.position}</Typography>
            <Typography>Start Date: {employmentInformation.startDate}</Typography>
            {/* Add more employment information fields as needed */}
          </Grid>
          <Grid item xs={12}>
            {/* Add other sections as needed (payroll, payment, deductions, etc.) */}
          </Grid>
        </Grid>
      </Paper>
      <Link to={`/info/${_id}/SalaryHistory`}>
        <Button variant="contained" color="primary" style={{marginTop: '20px' }}>
          View Salary History
        </Button>
      </Link>
    </div>
  );
};

Extendinfo
.propTypes = {
  employeeData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    personalInformation: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      // ... (other personal information fields)
    }).isRequired,
    employmentInformation: PropTypes.shape({
      position: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired, // Adjust the type according to the actual data type used
      // ... (other employment information fields)
    }).isRequired,
    payrollInformation: PropTypes.shape({
      // ... (other payroll information fields)
    }).isRequired,
    paymentInformation: PropTypes.shape({
      // ... (other payment information fields)
    }).isRequired,
    deductions: PropTypes.shape({
      // ... (other deductions fields)
    }).isRequired,
    specialWorkHistory: PropTypes.shape({
      // ... (other special work history fields)
    }).isRequired,
    adjustments: PropTypes.arrayOf(PropTypes.shape({
      // ... (other adjustment fields)
    })).isRequired,
  }).isRequired,
};

export default Extendinfo;
