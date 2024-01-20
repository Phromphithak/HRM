import { Helmet } from 'react-helmet-async';

import { MoreInfo } from 'src/sections/moreInfo/moreinfo';

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
