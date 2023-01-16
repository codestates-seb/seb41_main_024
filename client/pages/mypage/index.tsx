import { ReactElement } from 'react';
import LayoutWithFooter from '../../components/layout/layoutWithFooter/LayoutWithFooter';
import MyPageTab from '../../components/organisms/tab/myPageTab/MyPageTab';

const Mypage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-end h-[4.5rem] mb-10">
        <p className="text-xl">마이페이지</p>
      </div>
      <MyPageTab />
    </div>
  );
};
Mypage.getLayout = function (page: ReactElement) {
  return <LayoutWithFooter>{page}</LayoutWithFooter>;
};
export default Mypage;