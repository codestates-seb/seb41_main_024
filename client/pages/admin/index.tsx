import { ReactElement } from 'react';
import AdminChecker from '../../components/container/adminChecker/AdminChecker';
import AdminLayout from '../../components/container/adminLayout/AdminLayout';
import NTabs from '../../components/organisms/nTabs/NTabs';
import AnswerWork from '../../components/container/AdminWorks/AnswerWork';
import ReportWork from '../../components/container/AdminWorks/ReportWork';
import Head from 'next/head';

const Admin = () => {
  return (
    <AdminChecker path="/">
      <Head>
        <title>관리자 페이지</title>
      </Head>
      <div className="flex flex-col ani_fadeIn">
        <div className="flex justify-center items-end h-[4.5rem] mb-10">
          <p className="text-xl">관리자페이지</p>
        </div>
        <NTabs ariaLabel="내 서비스 탭" tabLabels={['신고처리', '1:1문의']}>
          <ReportWork />
          <AnswerWork />
        </NTabs>
      </div>
    </AdminChecker>
  );
};
Admin.getLayout = function (page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Admin;
