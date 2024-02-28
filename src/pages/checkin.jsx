import { Helmet } from 'react-helmet-async';

import { CheckInPage} from 'src/sections/checkin';

// ----------------------------------------------------------------------

export default function AddEmployeePage() {
  return (
    <>
      <Helmet>
        <title> checkinPage | Minimal UI </title>
      </Helmet>

      <CheckInPage />
    </>
  );
}
