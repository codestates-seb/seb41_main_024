import Input from '../../components/atoms/input/Input';
import FormButton from '../../components/atoms/formbutton/FormButton';
import Button from '../../components/atoms/button/Button';
import Label from '../../components/atoms/label/Label';
import TextField from '../../components/molecules/passwordTextField/TextField';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';

import React from 'react';

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
    pw: '',
  });

  const { email, pw } = form;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="mt-24">
        <LoginSlogan />
      </div>
      <div className="login flex justify-center m-7 my-12">
        <div className="flex flex-col w-10/12 max-w-lg">
          <Input
            id={'email-input'}
            name="email"
            type={'text'}
            label="이메일"
            value={email}
            onChange={onChange}
          />
          <Label htmlFor={'email-input'} labelText={''} />
          <TextField
            id={'password-input'}
            name="pw"
            type={'text'}
            label="패스워드"
            value={pw}
            onChange={onChange}
          />
          <Label
            htmlFor={'password-input'}
            labelText={'소문자와 특수문자를 포함한 8글자'}
          />
          <Button className="h-14 mt-4 bg-primary text-white rounded ">
            로그인
          </Button>
          <Button className="h-14 mt-4 border-solid border-1 border-[#63A8DA] text-primary rounded ">
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
