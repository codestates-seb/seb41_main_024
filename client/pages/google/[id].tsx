import React from 'react';

import { useRouter } from 'next/router';

const googleLogin = () => {
  const router = useRouter();

  console.log(router);
  return <div>야호</div>;
};

export default googleLogin;
