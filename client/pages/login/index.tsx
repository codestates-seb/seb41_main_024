import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import BottomNav from '../../components/organisms/bottomNav/bottomNav';
import Footer from '../../components/molecules/footer/Footer';
import Input from '../../components/atoms/input/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EmailInput from '../../components/molecules/passwordTextField/TextField';

import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';

const Slogan = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <p className="pt-px mt-4 text-lg">
        <strong className="text-primary font-bold">로그인</strong>하고
      </p>
      <p className="pb-px text-lg">
        <strong className="text-primary font-bold">쇼핑 친구</strong>를
        만나보세요
      </p>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div>
      <MainHeader />
      <div className="mt-24">
        <Slogan />
      </div>
      <div className="p-12 pb-20">
        <Stack spacing={2}>
          <Input
            id={''}
            label="우리 동네 N게더를 검색해보세요"
            selectProps={{
              native: false,
            }}
            rows={0}
            multiline={false}
            className="w-full"
          />
          <EmailInput />

          <Button variant="contained" fullWidth>
            로그인
          </Button>
          <Button variant="outlined" fullWidth>
            회원가입
          </Button>
        </Stack>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default LoginPage;

// const Login = () => {
//   return (
//     <div>
//       <label htmlFor="email">email </label>
//       <input id="email"></input>
//       <label htmlFor="password">password </label>
//       <input id="password"></input>
//     </div>
//   );
// };

// export default Login;
