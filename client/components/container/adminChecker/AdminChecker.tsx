import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAdminRole from '../../../hooks/common/useAdminRole';

import { adminCheckerPropsType } from './adminCheckerType';

const AdminChecker = ({ children, path }: adminCheckerPropsType) => {
  const router = useRouter();
  const {isAdmin, isFetching} = useAdminRole();
  useEffect(() => {
    if (!isAdmin) {
      router.push(path);
    }
  }, [isAdmin]);
  return (
    <>
      {isFetching && <div>Loading...</div>}
      {isAdmin && !isFetching && children}
    </>
  );
};

export default AdminChecker;