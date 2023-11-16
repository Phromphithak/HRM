import { Helmet } from 'react-helmet-async';

import { AddEmployee } from 'src/sections/addEmployee';

// ----------------------------------------------------------------------

export default function AddEmployeePage() {
  return (
    <>
      <Helmet>
        <title> AddEmployee | Minimal UI </title>
      </Helmet>

      <AddEmployee />
    </>
  );
}
