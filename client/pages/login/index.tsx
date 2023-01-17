import Input from '../../components/atoms/input/Input';
import Button from '../../components/atoms/button/Button';
import Label from '../../components/atoms/label/Label';
import TextField from '../../components/molecules/passwordTextField/TextField';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

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
  const [cookies, setCookie] = useCookies([
    'access_token',
    'refresh_token',
    'memberId',
    'nickName',
  ]);
  // const [cookies, setCookie] = useCookies(['userInfo']);

  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    pw: '',
  });

  const { email, pw } = form;

  function request() {
    // return axios.get('http://localhost:3001/productList');
    // return axios.get('http://3.34.54.131:8080/api/members');
    return axios.post('http://3.34.54.131:8080/auth/login', form);
  }

  const { data, isLoading, isError, refetch } = useQuery(
    ['loginData'],
    request,
    {
      enabled: false,
    }
  );

  console.log('로그인 data >>>', data);

  if (data) {
    setCookie('access_token', data.headers.authorization);
    setCookie('refresh_token', data.headers.refresh);
    setCookie('memberId', data.data.memberId);
    setCookie('nickName', data.data.nickName);

    // setCookie(
    //   'access_token',
    //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoidHR0dHJlMkBnbWFpbC5jb20iLCJzdWIiOiJ0dHR0cmUyQGdtYWlsLmNvbSIsImlhdCI6MTY3Mzg4MTk2MCwiZXhwIjoxNjczODg0MzYwfQ.EUE5WGZlTVqmnwZ0zkMGQJoFhR3SI8QIW9uqp3TXCP4'
    // );
    // setCookie(
    //   'refresh_token',
    //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0dHR0cmUyQGdtYWlsLmNvbSIsImlhdCI6MTY3Mzg4MTk2MCwiZXhwIjoxNjczOTA3MTYwfQ.VsuRLkixdd3GkuVfE3kNZontH-0FtoeLJUBndSVR0xM'
    // );
    // setCookie('memberId', 6);
    // setCookie('nickName', '냠냠');

    // setCookie('userInfo', {
    //   access_token: data.headers.Authorization,
    //   refresh_token: data.headers.Refresh,
    //   memberId: data.data.memberId,
    //   nickName: data.data.nickName,
    // });

    router.push('/');
  }

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
          <Button
            className="h-14 mt-4 bg-primary text-white rounded "
            onClick={refetch}
          >
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
