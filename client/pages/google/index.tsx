// import Button from '../../components/atoms/button/Button';
// import TextField from '../../components/molecules/passwordTextField/TextField';
import Input from '../../components/atoms/input/Input';
import Label from '../../components/atoms/label/Label';
import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import { NextRouter, useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { requestGoogleLogin, requestFirstGoogleLogin } from '../../api/members';
import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { checkNickName, checkPhoneNumber } from '../../api/socialLogin';
import Divider from '@mui/material/Divider';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const GoogleLoginPage = () => {
  const router: NextRouter = useRouter();
  const [open, setOpen] = useState(true);

  const [nickNameDuplicationCheckMessage, setNickNameDuplicationCheckMessage] =
    useState('');
  const [
    phoneNumberDuplicationCheckMessage,
    setPhoneNumberDuplicationCheckMessage,
  ] = useState('');

  const access_token: any = `Bearer ${router.query.access_token}`;
  const refresh_token: any = router.query.refresh_token;
  Cookies.set('access_token', access_token);
  Cookies.set('refresh_token', refresh_token);

  // 두 번째 소셜 로그인일 경우
  if (router.query.initial === 'false') {
    requestGoogleLogin().then((res) => {
      Cookies.set('memberId', res.data.memberId);
      Cookies.set('nickName', res.data.nickName);
      Cookies.set('locationId', res.data.locationId);
      router.push('/');
    });
  }

  const [form, setForm] = useState({
    nickName: '',
    phoneNumber: '',
  });

  const [nickNameForm, setNickNameForm] = useState({
    nickName: '',
  });

  const [phoneNumberForm, setPhoneNumberFrom] = useState({
    phoneNumber: '',
  });

  const { nickName, phoneNumber } = form;

  const handleCheckNickname = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await checkNickName(nickNameForm).then((res) => {
        console.log(res);
        if (res.data) {
          setNickNameDuplicationCheckMessage('사용 가능한 닉네임입니다.');
        }
      });
    } catch (error: any) {
      if (error.response.data.message === 'NickName is exists') {
        setNickNameDuplicationCheckMessage('이미 존재하는 닉네임입니다.');
      }
    }
  };

  const handleCheckPhoneNumber = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await checkPhoneNumber(phoneNumberForm).then((res) => {
        console.log(res);
        if (res.data) {
          setPhoneNumberDuplicationCheckMessage('사용 가능한 전화번호입니다.');
        }
      });
    } catch (error: any) {
      if (error.response.data.message === 'phoneNumber is exists') {
        setPhoneNumberDuplicationCheckMessage('이미 존재하는 전화번호입니다.');
      }
    }
  };

  const handleSocialEdit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      nickNameDuplicationCheckMessage === '' &&
      phoneNumberDuplicationCheckMessage === ''
    ) {
      requestFirstGoogleLogin(form).then((res) => {
        Cookies.set('memberId', res.data.memberId);
        Cookies.set('nickName', res.data.nickName);
        Cookies.set('locationId', res.data.locationId);
        router.push('/');
      });
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === 'phoneNumber') {
      setForm({
        ...form,
        [name]: value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, ''),
      });
      setPhoneNumberFrom({
        phoneNumber: value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, ''),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
      setNickNameForm({
        nickName: value,
      });
    }
  };

  console.log('phoneNumberForm', phoneNumberForm);
  console.log('nickNameForm', nickNameForm);

  const handleClose = (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') {
      console.log(reason);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
          <div className="mt-10">
            <SocialLoginTitle />
          </div>
          <Box sx={{ width: 300, mt: 6, mb: 10, mx: 6 }}>
            <Stack>
              <Input
                id="nickName-input"
                name="nickName"
                type={'text'}
                label="닉네임"
                value={nickName}
                onChange={onChange}
              />
            </Stack>
            <Label htmlFor={'nickName-input'} labelText={''} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              className="my-2"
            >
              <p className="text-[#dd3030]">
                {nickNameDuplicationCheckMessage}
              </p>
              <Button
                variant="outlined"
                className="rounded"
                onClick={handleCheckNickname}
                size="small"
              >
                중복 체크
              </Button>
            </Stack>
            {/* <Divider variant="middle" sx={{ my: 1 }} /> */}
            <Stack>
              <Input
                id="phoneNumber-input"
                name="phoneNumber"
                type={'text'}
                label="휴대전화"
                value={phoneNumber}
                onChange={onChange}
              />
            </Stack>
            <Label htmlFor={'phoneNumber-input'} labelText={''} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              className="my-2"
            >
              <p className="text-[#dd3030]">
                {phoneNumberDuplicationCheckMessage}
              </p>
              <Button
                variant="outlined"
                className="rounded"
                onClick={handleCheckPhoneNumber}
                size="small"
              >
                중복 체크
              </Button>
            </Stack>

            <Stack>
              <Button
                className="h-14 mt-4 bg-primary text-white rounded"
                onClick={handleSocialEdit}
              >
                완료
              </Button>
            </Stack>
          </Box>
        </Dialog>
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
        <strong className="text-primary font-bold">내 정보</strong>를 입력하고
      </p>
      <p className="pb-px text-lg">
        <strong className="text-primary font-bold">N게더</strong>에 참여해보세요
      </p>
    </div>
  );
};
