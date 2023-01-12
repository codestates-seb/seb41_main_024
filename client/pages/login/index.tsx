import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import BottomNav from '../../components/organisms/bottomNav/bottomNav';
import Footer from '../../components/molecules/footer/Footer';
import Input from '../../components/atoms/input/Input';
import FormButton from '../../components/atoms/formbutton/FormButton';
import Label from '../../components/atoms/label/Label';
import TextField from '../../components/molecules/passwordTextField/TextField';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import Navbar from '../../components/organisms/navbar/Navbar';

const LoginSlogan = () => {
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
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  let emailRegexText = '사용가능한 이메일 입니다';
  let checkedPasswordRegexText = '사용하실 패스워드를 한 번 더 입력해주세요';

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (email !== '' && !emailRegex.test(email)) {
    emailRegexText = '이메일 양식과 맞게 입력해주세요';
  }

  return (
    <div>
      {/* <Navbar /> */}
      <MainHeader />
      <div className="mt-24">
        <LoginSlogan />
      </div>
      <div className="flex justify-center m-7 my-12">
        <form className="flex flex-col w-10/12 max-w-lg">
          <Input
            id={'email-input'}
            name="email"
            type={'text'}
            label="이메일"
            value={email}
            onChange={onChange}
          />
          <Label htmlFor={'email-input'} labelText={emailRegexText} />
          <TextField
            id={'password-input'}
            name="password"
            type={'text'}
            label="패스워드"
            value={password}
            onChange={onChange}
          />
          <Label
            htmlFor={'password-input'}
            labelText={'소문자와 특수문자를 포함한 8글자'}
          />
          <FormButton
            className="h-14 mt-4"
            variant="contained"
            content="로그인"
          />
          <FormButton
            className="h-14 mt-4"
            variant="outlined"
            content="회원가입"
          />
        </form>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default LoginPage;
