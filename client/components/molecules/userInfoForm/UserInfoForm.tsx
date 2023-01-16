import { useState } from 'react';
import FormButton from '../../atoms/formbutton/FormButton';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import TextField from '../../molecules/passwordTextField/TextField';
import base from '../../../public/imageBox/base-box.svg';
import { UserInfoFormPropsType } from './userInfoFormType';

const UserInfoForm = ({ editPage, content }: UserInfoFormPropsType) => {
  const [form, setForm] = useState({
    email: '',
    nickName: '',
    password: '',
    checkedPassword: '',
  });

  const { email, nickName, password, checkedPassword } = form;

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
  if (checkedPassword !== '' && checkedPassword !== password) {
    checkedPasswordRegexText = '비밀번호와 똑같이 입력해주세요';
  }

  return (
    <div className="flex justify-center mt-7">
      <form className="flex flex-col justify-center w-10/12 max-w-lg">
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
          onChange={onChange}
        />
        <Label htmlFor={'email-input'} labelText={emailRegexText} />
        <Input
          id={'nickName-input'}
          name="nickName"
          type={'text'}
          label={'새로운 닉네임'}
          value={nickName}
          onChange={onChange}
        />
        <Label
          htmlFor={'nickName-input'}
          labelText={'사용가능한 닉네임 입니다'}
        />
        <TextField
          id={'password-input'}
          name="password"
          type={'text'}
          label={'새로운 패스워드'}
          value={password}
          onChange={onChange}
        />
        <Label
          htmlFor={'password-input'}
          labelText={'소문자와 특수문자를 포함한 8글자'}
        />
        <TextField
          id={'password-check-input'}
          name="checkedPassword"
          type={'text'}
          label={'패스워드 확인'}
          value={checkedPassword}
          onChange={onChange}
        />
        <Label
          htmlFor={'password-check-input'}
          labelText={checkedPasswordRegexText}
        />
        <FormButton
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
