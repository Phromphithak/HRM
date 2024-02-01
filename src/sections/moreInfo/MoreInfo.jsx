// info.jsx
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Extendinfo from './Extendinfo';
// import SalarySlip from './salaryslip';
import SalaryHistory from './SalaryHistory';

const MoreInfo = () => {
  // const Navigate = useNavigate;
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
  const { employeeId } = useParams();

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

  return (
    <div>
      <Extendinfo employeeData={employeeData}/>
      <br />
      <SalaryHistory employeeData={employeeData}/>
    </div>
  );
};

export default MoreInfo;
