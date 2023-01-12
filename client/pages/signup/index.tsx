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
import UserInfoForm from '../../components/molecules/userInfoForm/UserInfoForm';

const SignupSlogan = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <p className="pt-px mt-4 text-lg">
        간편하게
        <strong className="text-primary font-bold"> 회원가입</strong>하고
      </p>
      <p className="pb-px text-lg">
        <strong className="text-primary font-bold">N게더</strong>에 참여해보세요
      </p>
    </div>
  );
};

const SignupPage = () => {
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
      <MainHeader />
      <div className="mt-24">
        <SignupSlogan />
      </div>
      <div className="m-7 my-12">
        <UserInfoForm editPage={false} content="회원가입" />
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default SignupPage;
