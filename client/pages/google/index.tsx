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

const GoogleLoginPage = () => {
  const router: NextRouter = useRouter();

  const access_token: any = `Bearer ${router.query.access_token}`;
  const refresh_token: any = router.query.refresh_token;
  Cookies.set('access_token', access_token);
  Cookies.set('refresh_token', refresh_token);

  // 두 번째 소셜 로그인일 경우
  if (router.query.initial === 'false') {
    requestGoogleLogin().then((res) => {
      Cookies.set('memberId', res.data.memberId, {
        expires: 7,
      });
      Cookies.set('nickName', res.data.nickName, {
        expires: 7,
      });
      Cookies.set('locationId', res.data.locationId, {
        expires: 7,
      });
      router.push('/');
    });
  }

  const [form, setForm] = useState({
    nickName: '',
    phoneNumber: '',
  });

  const { nickName, phoneNumber } = form;

  const handleSocialEdit = () => {
    requestFirstGoogleLogin(form).then((res) => {
      Cookies.set('memberId', res.data.memberId, {
        expires: 7,
      });
      Cookies.set('nickName', res.data.nickName, {
        expires: 7,
      });
      Cookies.set('locationId', res.data.locationId, {
        expires: 7,
      });
      router.push('/');
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const [open, setOpen] = useState(true);

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
          <div>
            <div className="mt-10">
              <SocialLoginTitle />
            </div>
            <div className="login flex justify-center m-7 my-12">
              <div className="flex flex-col w-full max-w-lg">
                <Input
                  id="nickName-input"
                  name="nickName"
                  type={'text'}
                  label="닉네임"
                  value={nickName}
                  onChange={onChange}
                />
                <Label htmlFor={'nickName-input'} labelText={''} />
                <Input
                  id="phoneNumber-input"
                  name="phoneNumber"
                  type={'text'}
                  label="휴대전화"
                  value={phoneNumber}
                  onChange={onChange}
                />
                <Label htmlFor={'phoneNumber-input'} labelText={''} />
                <p className="text-[#dd3030]"></p>
                <Button
                  className="h-14 mt-4 bg-primary text-white rounded"
                  onClick={handleSocialEdit}
                >
                  완료
                </Button>
              </div>
            </div>
          </div>
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
