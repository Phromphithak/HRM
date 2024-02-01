// moreInfo.jsx
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Paper, Typography } from '@mui/material';

const Extendinfo = ({ employeeData }) => {
  const {
    // _id,
    personalInformation,
    employmentInformation,
    payrollInformation,
    paymentInformation,
    // deductions,
    // specialWorkHistory,
    // adjustments,
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
            <Typography>National ID: {personalInformation.nationalID}</Typography>
            <Typography>Telephone : {personalInformation.phoneNumber}</Typography>
            <Typography>Email : {personalInformation.email}</Typography>

          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Employment Information
            </Typography>
            <Typography>Position: {employmentInformation.position}</Typography>
            <Typography>Start Date: {employmentInformation.startDate}</Typography>
            <Typography>WorkSchedule: {employmentInformation.workSchedule}</Typography>
            {/* Add more employment information fields as needed */}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Payment & Payroll
            </Typography>
            <Typography>Payment Method: {paymentInformation.paymentMethod}</Typography>

            <Typography>Base Salary: {payrollInformation.salary}</Typography>
            <Typography>Tex Deducation: {payrollInformation.taxDeduction}</Typography>
            <Typography>Social Dedcation: {payrollInformation.socialSecurity}</Typography>
            <Typography>OverTime: {payrollInformation.overtime}</Typography>

          </Grid>

        </Grid>
      </Paper>

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
      nationalID: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    employmentInformation: PropTypes.shape({
      position: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired, // Adjust the type according to the actual data type used
      workSchedule: PropTypes.string.isRequired,
      leaveHistory: PropTypes.array.isRequired
    }).isRequired,
    payrollInformation: PropTypes.shape({
      salary: PropTypes.number.isRequired,
      taxDeduction: PropTypes.number.isRequired,
      socialSecurity: PropTypes.number.isRequired,
      overtime: PropTypes.number.isRequired,
    }).isRequired,
    paymentInformation: PropTypes.shape({
      paymentMethod: PropTypes.string.isRequired,
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
