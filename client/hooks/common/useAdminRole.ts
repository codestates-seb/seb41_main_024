import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAdminRole = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const adminRole = Cookies.get('role');

  useEffect(() => {
    if (adminRole !== 'ADMIN') setIsAdmin(false);
    setIsFetching(false);
  }, []);

  return { isAdmin, isFetching };
}
export default useAdminRole;