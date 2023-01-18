import { useState, useEffect } from 'react';
import FormButton from '../formbutton/FormButton';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import TextField from '../../molecules/passwordTextField/TextField';
import base from '../../../public/imageBox/base-box.svg';
import { userInfoFormType } from './userInfoFormType';
import useRegexText from '../../../hooks/useRegexText';
import useForm from '../../../hooks/useForm';
import axios from 'axios';

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})');
const SIGN_UP_URL = 'http://3.34.54.131:8080/api/members';
const EDIT_USER_INFO_URL = 'http://3.34.54.131:8080/api/members/patch';

const UserInfoForm = ({ editPage, content, userInfo }: userInfoFormType) => {
  const { formValue, checkedPw, handleInputChange, setFormValue } = useForm({
    pw: '',
    nickName: '',
    email: '',
    phoneNumber: '',
  });

  const { email, nickName, pw, phoneNumber } = formValue;

  const emailRegexText = useRegexText({
    state: email,
    regex: emailRegex,
    text: {
      default: '사용하실 이메일을 적어주세요',
      match: '사용 가능한 이메일 입니다',
      unMatch: '이메일 양식과 맞게 입력해주세요',
    },
  });
  const passwordRegexText = useRegexText({
    state: pw,
    regex: passwordRegex,
    text: {
      default:
        '비밀번호는 소문자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.',
      match: '사용 가능한 비밀번호 입니다',
      unMatch: '소문자, 특수문자를 각 하나 포함한 8자리 이상이여야 합니다.',
    },
  });
  const checkedPasswordRegexText = useRegexText({
    state: checkedPw,
    checkPassword: pw,
    text: {
      default: '사용하실 패스워드를 한 번 더 입력해주세요',
      match: '비밀번호와 일치합니다',
      unMatch: '비밀번호와 똑같이 입력해주세요',
    },
  });

  useEffect(() => {
    setFormValue({
      ...formValue,
      email: userInfo.email,
      nickName: userInfo.nickName,
      phoneNumber: userInfo.phoneNumber,
    });
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editPage) {
      try {
        await axios.post(SIGN_UP_URL, JSON.stringify(formValue), {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('회원으로 가입되셨습니다!');
      } catch (error) {
        console.log(`다음과 같은 오류 ${error}가 발생했습니다:`);
      }
    }
    if (editPage) {
      try {
        await axios.patch(EDIT_USER_INFO_URL, JSON.stringify(formValue), {
          headers: {
            'Content-Type': 'application/json',
            // +JWT
          },
        });
        console.log('회원으로 가입되셨습니다!');
      } catch (error) {
        console.log(`다음과 같은 오류 ${error}가 발생했습니다:`);
      }
    }
  };

  return (
    <div className="flex justify-center mt-7">
      <form
        className="flex flex-col justify-center w-10/12 max-w-lg"
        onSubmit={onSubmit}
      >
        {editPage && (
          <img
            className="h-40 w-40 mb-7 m-auto"
            src={base}
            alt={'유저이미지'}
          />
        )}
        <Input
          id={'email-input'}
          name="email"
          type={'text'}
          label={'새로운 이메일'}
          value={email}
          onChange={handleInputChange}
        />
        <Label htmlFor={'email-input'} labelText={emailRegexText} />
        <Input
          id={'phoneNumber-input'}
          name="phoneNumber"
          type={'text'}
          label={'휴대전화'}
          value={phoneNumber}
          onChange={handleInputChange}
        />
        <Label
          htmlFor={'phoneNumber-input'}
          labelText={'전화번호를 입력하세요'}
        />
        <Input
          id={'nickName-input'}
          name="nickName"
          type={'text'}
          label={'새로운 닉네임'}
          value={nickName}
          onChange={handleInputChange}
        />
        <Label
          htmlFor={'nickName-input'}
          labelText={'사용하실 닉네임을 적어주세요'}
        />
        <TextField
          id={'pw-input'}
          name="pw"
          type={'text'}
          label={'새로운 패스워드'}
          value={pw}
          onChange={handleInputChange}
        />
        <Label htmlFor={'pw-input'} labelText={passwordRegexText} />
        <TextField
          id={'checkedPw-input'}
          name="checkedPw"
          type={'text'}
          label={'패스워드 확인'}
          value={checkedPw}
          onChange={handleInputChange}
        />
        <Label
          htmlFor={'checkedPw-input'}
          labelText={checkedPasswordRegexText}
        />
        <FormButton
          type="submit"
          className="h-14 mt-4"
          variant="contained"
          content={content}
        />
        {editPage && (
          <FormButton
            className="h-14 mt-4"
            variant="outlined"
            content="회원탈퇴"
          />
        )}
      </form>
    </div>
  );
};

export default UserInfoForm;
