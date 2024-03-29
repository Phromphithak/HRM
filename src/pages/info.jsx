import { Helmet } from 'react-helmet-async';

import MoreInfo from 'src/sections/moreInfo/MoreInfo';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <MoreInfo />
    </>
  );
}
