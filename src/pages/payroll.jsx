import { Helmet } from 'react-helmet-async';

import { PayrollView } from 'src/sections/payroll/view';

// ----------------------------------------------------------------------

export default function PayrollPage() {
  return (
    <>
      <Helmet>
        <title> Payroll | Minimal UI </title>
      </Helmet>
        
      <PayrollView />
    </>
  );
}
