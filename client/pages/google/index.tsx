// import Button from '../../components/atoms/button/Button';
// import TextField from '../../components/molecules/passwordTextField/TextField';
import Input from '../../components/atoms/input/Input';
import Label from '../../components/atoms/label/Label';
import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import { NextRouter, useRouter } from 'next/router';
import Cookies from 'js-cookie';
import {
  requestGoogleLogin,
  requestFirstGoogleLogin,
  deleteGoogleUser,
} from '../../api/members';
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

import createProfileRandomUrl from '../../utils/createProfileRandomUrl/createProfileRandomUrl';
import RandomProfile from '../../components/organisms/randomProfile/RandomProfile';

const randomProfile = createProfileRandomUrl(15);

const GoogleLoginPage = () => {
  const router: NextRouter = useRouter();
  const [allChecked, setAllchecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(true);

  const [form, setForm] = useState({
    nickName: '',
    phoneNumber: '',
    imageLink: randomProfile,
  });
  const [profileUrl, setProfileUrl] = useState(randomProfile);

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
        if (res.data) {
          setNickNameDuplicationCheckMessage('checked');
        }
      });
    } catch (error: any) {
      if (error?.response?.data?.status === 417) {
        setNickNameDuplicationCheckMessage('failed');
      }
    }
  };

  const handleCheckPhoneNumber = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await checkPhoneNumber(phoneNumberForm).then((res) => {
        if (res.data) {
          setPhoneNumberDuplicationCheckMessage('checked');
        }
      });
    } catch (error: any) {
      if (error?.response?.data?.status === 418) {
        setPhoneNumberDuplicationCheckMessage('failed');
      }
    }
  };

  const handleClickRandomProfile = async () => {
    setProfileUrl(createProfileRandomUrl(15));
  };
  useEffect(() => {
    setForm({
      ...form,
      imageLink: profileUrl,
    });
  }, [profileUrl]);

  const handleSocialEdit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      nickNameDuplicationCheckMessage === 'checked' &&
      phoneNumberDuplicationCheckMessage === 'checked'
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
      setPhoneNumberDuplicationCheckMessage('');
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
    } else if (name === 'nickName') {
      setNickNameDuplicationCheckMessage('');
      setForm({
        ...form,
        [name]: value,
      });
      setNickNameForm({
        nickName: value,
      });
    }
  };

  useEffect(() => {
    if (
      nickNameDuplicationCheckMessage === 'checked' &&
      phoneNumberDuplicationCheckMessage === 'checked'
    ) {
      setAllchecked(true);
    }
  }, [nickNameDuplicationCheckMessage, phoneNumberDuplicationCheckMessage]);

  const handleClose = (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') {
    } else {
      setDialogOpen(false);
    }
  };

  const handleDeleteGoogleUser = () => {
    deleteGoogleUser().then((res) => {
      Cookies.remove('access_token', { path: '' });
      Cookies.remove('refresh_token', { path: '' });
      router.push('/');
    });
  };

  console.log('form', form);
  return (
    <div>
      <div>
        <Dialog open={dialogOpen} onClose={handleClose} disableEscapeKeyDown>
          <div className="mt-16">
            <SocialLoginTitle />
          </div>
          <Stack>
            <p className="text-center text-primary my-4">
              닉네임과 휴대전화를 입력하지 않으시면
              <br />
              서비스 이용에 제한이 있습니다
            </p>
          </Stack>
          <Box sx={{ width: 250, mt: 1, mb: 4, mx: 6 }}>
            <Stack>
              <RandomProfile
                onClick={handleClickRandomProfile}
                profileUrl={profileUrl}
              />
            </Stack>
            <Stack>
              <Input
                id="nickName-input"
                name="nickName"
                type={'text'}
                label="닉네임"
                value={nickName}
                onChange={onChange}
                inputProps={{ maxLength: 25 }}
              />
            </Stack>
            <Label htmlFor={'nickName-input'} labelText={''} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              className="mt-2 mb-4"
            >
              <Stack>
                {nickNameDuplicationCheckMessage === 'failed' && (
                  <p className="text-[#dd3030]">이미 존재하는 닉네임입니다.</p>
                )}
                {nickNameDuplicationCheckMessage === 'checked' && (
                  <p className="text-[#2EB150]">사용 가능한 닉네임입니다.</p>
                )}
              </Stack>
              <Button
                variant="text"
                className="rounded"
                onClick={handleCheckNickname}
                size="small"
              >
                중복 확인
              </Button>
            </Stack>

            <Stack>
              <Input
                id="phoneNumber-input"
                name="phoneNumber"
                type={'text'}
                label="휴대전화"
                value={phoneNumber}
                onChange={onChange}
                inputProps={{ maxLength: 13 }}
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
              <Stack>
                {phoneNumberDuplicationCheckMessage === 'failed' && (
                  <p className="text-[#dd3030]">
                    이미 존재하는 전화번호입니다.
                  </p>
                )}
                {phoneNumberDuplicationCheckMessage === 'checked' && (
                  <p className="text-[#2eb150]">사용 가능한 전화번호입니다.</p>
                )}
              </Stack>
              <Button
                variant="text"
                className="rounded"
                onClick={handleCheckPhoneNumber}
                size="small"
              >
                중복 확인
              </Button>
            </Stack>
            <Stack>
              {!allChecked && (
                <Button
                  disabled
                  variant="contained"
                  className="h-14 mt-4rounded"
                  onClick={handleSocialEdit}
                  sx={{
                    '& .Mui-disabled': {
                      color: 'white',
                      backgroundColor: '#ff5656',
                    },
                  }}
                >
                  완료
                </Button>
              )}
              {allChecked && (
                <Button
                  className="h-14 mt-4 bg-primary text-white rounded"
                  onClick={handleSocialEdit}
                >
                  완료
                </Button>
              )}

              <Button
                variant="text"
                className="h-6 mt-4 text-sm"
                onClick={handleDeleteGoogleUser}
              >
                홈으로 가기
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
      <p className="pt-px mt-2 text-lg">
        <strong className="text-primary font-bold">내 정보</strong>를 입력하고
      </p>
      <p className="pb-px text-lg">
        <strong className="text-primary font-bold">N게더</strong>에 참여해보세요
      </p>
    </div>
  );
};
