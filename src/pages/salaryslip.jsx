import { Helmet } from 'react-helmet-async';

import SalarySlip from 'src/sections/moreInfo/Salaryslip';

// ----------------------------------------------------------------------

export default function AddEmployeePage() {
  return (
    <>
      <Helmet>
        <title> salaryslip | Minimal UI </title>
      </Helmet>

      < SalarySlip />
    </>
  );
}
