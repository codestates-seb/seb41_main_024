import { ReactElement } from 'react';
import AdminChecker from '../../components/container/adminChecker/AdminChecker';
import AdminLayout from '../../components/container/adminLayout/AdminLayout';
import AdminTab from '../../components/organisms/tab/adminTab/AdminTab';

const Admin = () => {
  return (
    <AdminChecker path='/'>
      <div className="flex flex-col">
        <div className="flex justify-center items-end h-[4.5rem] mb-10">
          <p className="text-xl">관리자페이지</p>
        </div>
        <AdminTab />
      </div>
    </AdminChecker>
  );
};
Admin.getLayout = function (page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Admin;
