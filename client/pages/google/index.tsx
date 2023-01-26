import Input from '../../components/atoms/input/Input';
import Button from '../../components/atoms/button/Button';
import Label from '../../components/atoms/label/Label';
import TextField from '../../components/molecules/passwordTextField/TextField';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { requestLogin, requestSignUp } from '../../api/members';
import Cookies from 'js-cookie';
import { signIn, useSession } from 'next-auth/react';
import { getAllUsers } from '../../api/members';
import useRegexText from '../../hooks/useRegexText';
import React from 'react';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import axios from 'axios';

// export async function getServerSideProps(context: any) {
//   const { id } = context.params;
//   console.log(context.query);
//   return {
//     props: {
//       id,
//     },
//   };
// }

const GoogleLoginPage = () => {
  const REQUEST_URL = 'https://ngether.site';
  const router = useRouter();
  const session = useSession();

  console.log(router);
  console.log(router.query);
  // console.log('session', session.data);

  useEffect(() => {
    console.log(window.location);
  });
  // function isFirstSocialLogin() {
  //   return axios.post(
  //     `${REQUEST_URL}/api/어쩌구`,
  //     {
  //       email: session.user.email,
  //     },
  //     {
  //       headers: {
  //         Authorization: Cookies.get('access_token'),
  //       },
  //     }
  //   );
  // }

  function requestSocialLogin(form: object) {
    return axios.post(`${REQUEST_URL}/api/reports`, form, {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    });
  }

  useEffect(() => {
    // 최초 로그인인지 판별하는 요청 (T/F)
    // axios
    //   .get(`${REQUEST_URL}/api/어쩌구`, {
    //     headers: {
    //       Authorization: Cookies.get('access_token'),
    //       Refresh: Cookies.get('refresh_token'),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     // 최초 로그인이 아닐 경우 =>
    //     // if (!res.data.isFirstSocialLogin) {
    //     //   data.headers.authorization &&
    //     //     Cookies.set('access_token', data.headers.authorization);
    //     //   data.headers.refresh &&
    //     //     Cookies.set('refresh_token', data.headers.refresh);
    //     //   Cookies.set('memberId', data.data.memberId);
    //     //   Cookies.set('nickName', data.data.nickName);
    //     //   Cookies.set('locationId', data.data.locationId);
    //     //   router.push('/');
    //     // }
    //   });
  });

  const [form, setForm] = useState({
    nickname: session?.data?.user?.name,
    phonenumber: '',
  });

  // console.log(form);
  const { nickname, phonenumber } = form;

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
        <SocialLoginTitle />
      </div>
      <div className="login flex justify-center m-7 my-12">
        <div className="flex flex-col w-10/12 max-w-lg">
          <Input
            id="nickname-input"
            name="nickname"
            type={'text'}
            label="닉네임"
            value={nickname}
            onChange={onChange}
          />
          <Label htmlFor={'nickname-input'} labelText={''} />
          <Input
            id="phonenumber-input"
            name="phonenumber"
            type={'text'}
            label="휴대전화"
            value={phonenumber}
            onChange={onChange}
          />
          <Label htmlFor={'phonenumber-input'} labelText={''} />

          <p className="text-[#dd3030]"></p>

          <Button
            className="h-14 mt-4 bg-primary text-white rounded"
            onClick={() => router.push('/')}
          >
            수정하기
          </Button>

          {/* <Input
          id="email-input"
          name="email"
          type={'text'}
          label="이메일"
          value={email}
          onChange={onChange}
        />
        <Label htmlFor={'email-input'} labelText={emailRegexText} />
        <TextField
          id="password-input"
          name="pw"
          label="패스워드"
          value={pw}
          onChange={onChange}
        />
        <Label htmlFor={'password-input'} labelText={passwordRegexText} />
        <p className="text-[#dd3030]">{loginErrorMessage}</p>
        <Button className="h-14 mt-4 bg-primary text-white rounded" onClick={}>
          로그인
        </Button>
        <Button
          className="h-14 my-4 border-solid border-1 border-[#63A8DA] text-primary rounded "
          onClick={() => router.push('/signup')}
        >
          회원가입
        </Button> */}
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;

const SocialLoginTitle = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <p className="pt-px mt-4 text-lg">
        <strong className="text-primary font-bold">내 정보 수정</strong>하고
      </p>

      <p className="pb-px text-lg">
        <strong className="text-primary font-bold">N게더</strong>에 참여해보세요
      </p>
    </div>
  );
};
