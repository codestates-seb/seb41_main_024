import Input from '../components/atoms/input/Input';
import Label from '../components/atoms/label/Label';
import { ReactElement, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import MainSlogan from '../components/molecules/slogan/mainSlogan/MainSlogan';
import LayoutWithFooter from '../components/container/layoutWithFooter/LayoutWithFooter';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayoutType';
import Link from 'next/link';

const MainPage: NextPageWithLayout = () => {
  const [nearBy, setNearBy] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNearBy(value);
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="mt-24">
        <MainSlogan />
      </div>
      <div className="login flex justify-center m-7 my-12">
        <div className="flex flex-col w-[100%] items-center">
          <p>
            <strong className="font-normal text-lg">
              <span className="text-[#63A8DA] font-bold">Ngether</span>는 위치
              기반으로 주변 이웃들과{' '}
              <span className="text-[#63A8DA] font-bold">공동구매</span>를 할 수
              있는 플랫폼입니다.
            </strong>
          </p>
          <Link
            href="/search"
            className="h-14 mt-[48px] w-10/12 max-w-lg bg-[#63A8DA] text-white flex items-center justify-center rounded"
          >
            <SearchOutlinedIcon />
            지도에서 위치 검색하기
          </Link>
        </div>
      </div>
      {/* <div className="fixed w-[100%] bottom-[70px] left-0">
        <Footer />
      </div> */}
    </div>
  );
};
MainPage.getLayout = function (page: ReactElement) {
  return <LayoutWithFooter>{page}</LayoutWithFooter>;
};

export default MainPage;
