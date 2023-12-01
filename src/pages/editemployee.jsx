import { Helmet } from 'react-helmet-async';

import { EditEmployeeView } from 'src/sections/editemployee';

// ----------------------------------------------------------------------

export default function editEmployeePage() {
  return (
    <>
      <Helmet>
        <title> EditEmployee | Minimal UI </title>
      </Helmet>

      <EditEmployeeView />
    </>
  );
}
