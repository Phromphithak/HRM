import { Helmet } from 'react-helmet-async';

import SalaryHistory from 'src/sections/moreInfo/SalaryHistory';

// ----------------------------------------------------------------------

export default function AddEmployeePage() {
  return (
    <>
      <Helmet>
        <title> SalaryHistory | Minimal UI </title>
      </Helmet>

      <SalaryHistory />
    </>
  );
}
