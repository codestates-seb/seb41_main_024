import { ReactElement } from 'react';
import AdminLayout from '../../components/container/adminLayout/AdminLayout';
import AdminTab from '../../components/organisms/tab/adminTab/AdminTab';

const Admin = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-end h-[4.5rem] mb-10">
        <p className="text-xl">관리자페이지</p>
      </div>
      <AdminTab />
    </div>
  );
};
Admin.getLayout = function (page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Admin;
