import Input from '../components/atoms/input/Input';
import Label from '../components/atoms/label/Label';
import { ReactElement, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import MainSlogan from '../components/molecules/slogan/mainSlogan/MainSlogan';
import Footer from '../components/molecules/footer/Footer';
import LayoutWithFooter from '../components/container/layoutWithFooter/LayoutWithFooter';
import { NextPageWithLayout } from '../components/container/defalutLayout/defaultLayout';

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
        <form className="flex flex-col w-10/12 max-w-lg">
          <Input
            id="search"
            type="text"
            label="우리동네 N게더를 검색해보세요"
            value={nearBy}
            onChange={onChange}
          />
          <Label htmlFor="search" labelText="" />
          <Button variant="contained" fullWidth className="h-14 mt-4">
            <SearchOutlinedIcon />
            위치 검색
          </Button>
          <Button variant="outlined" fullWidth className="h-14 mt-4">
            <SearchOutlinedIcon />내 위치로 검색
          </Button>
        </form>
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
