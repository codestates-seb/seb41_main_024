import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import BottomNav from '../../components/organisms/bottomNav/BottomNav';
import Footer from '../../components/molecules/footer/Footer';
import Input from '../../components/atoms/input/Input';
import FormButton from '../../components/atoms/formbutton/FormButton';
import Label from '../../components/atoms/label/Label';
import TextField from '../../components/molecules/passwordTextField/TextField';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';

const MainSlogan = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <p className="pt-px mt-4 text-lg">
        <strong className="text-primary font-bold">필요</strong>한 만큼만,
        <strong className="text-primary font-bold"> 구매</strong>의 새로운 방법
      </p>
      <p className="pb-px text-lg">
        Find your
        <strong className="text-primary font-bold"> shopping mate</strong>
      </p>
    </div>
  );
};

const MainPage = () => {
  const [nearBy, setNearBy] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNearBy(value);
  };

  return (
    <div>
      <MainHeader />
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
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainPage;
