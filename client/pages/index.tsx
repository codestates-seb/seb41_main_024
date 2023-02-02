import Input from '../components/atoms/input/Input';
import Label from '../components/atoms/label/Label';
import { ReactElement, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import MainSlogan from '../components/molecules/slogan/mainSlogan/MainSlogan';
import LayoutWithFooter from '../components/container/layoutWithFooter/LayoutWithFooter';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayoutType';
import Link from 'next/link';
import Head from 'next/head';

const MainPage: NextPageWithLayout = () => {
  const [nearBy, setNearBy] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNearBy(value);
  };

  return (
    <div className="flex flex-col flex-grow my-28 ani_fadeIn">
      <Head>
        <title>Ngether 홈</title>
      </Head>
      <div className="">
        <MainSlogan />
      </div>
      <div className="login flex justify-center m-7 my-4">
        <div className="flex flex-col w-[100%] items-center text-center break-keep">
          <p className="pt-px mt-4 text-lg">
            <strong className="text-primary font-bold">Ngether</strong>는{' '}
            <strong className="text-primary font-bold">위치 기반</strong>으로
            주변 이웃들과
          </p>
          <p className="pb-px text-lg">
            <strong className="text-primary font-bold"> 공동구매</strong>를 할
            수 있는 플랫폼입니다
          </p>

          <Link
            href="/search"
            className="h-14 m-[48px] w-10/12 max-w-lg bg-[#63A8DA] text-white flex items-center justify-center rounded"
          >
            <SearchOutlinedIcon className="w-[18px] h-[18px] fill-white" />
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
