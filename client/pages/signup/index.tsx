import { useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import FormButton from '../../components/molecules/formbutton/FormButton';
import NTextField from '../../components/organisms/nTextField/NTextField';
import useValidation from '../../hooks/common/useValidation';
import validationInfo from '../../utils/validationInfo/validationInfo';
import postSignup from '../../api/postSignup';
import { useRouter } from 'next/router';

import axios, { AxiosResponse } from 'axios';

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
  const [formValue, setFormValue] = useState({
    email: '',
    nickName: '',
    phoneNumber: '',
    pw: '',
  });
  const router = useRouter();
  const [pwConfirm, setPwConfirm] = useState('');
  const { email, nickName, pw, phoneNumber } = formValue;
  const { helperText, isValid, formValid } = useValidation(
    formValue,
    pwConfirm,
    validationInfo
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    if (id === 'pwConfirm') {
      setPwConfirm(value);
    } else if (id === 'phoneNumber') {
      setFormValue({
        ...formValue,
        [id]: value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, ''),
      });
    } else {
      setFormValue({
        ...formValue,
        [id]: value,
      });
    }
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await postSignup(formValue);
      if (result.status === 200) {
        alert('회원가입이 완료되었습니다');
        router.push('/login');
      }
    } catch (error) {
      console.log(`다음과 같은 오류 ${error}가 발생했습니다:`);
    }
  };
  return (
    <div>
      <div className="mt-24">
        <SignupSlogan />
      </div>
      <div className="m-7 my-12">
        <div className="flex justify-center mb-[3.75rem]">
          <form
            className="flex flex-col justify-center w-10/12 max-w-lg"
            onSubmit={onSubmitHandler}
          >
            <NTextField
              id="email"
              type="email"
              label={'이메일'}
              value={email}
              validation={isValid.isEmail}
              helperText={helperText.ofEmail}
              onChange={handleInputChange}
              required={true}
            />
            <NTextField
              id="nickName"
              type="text"
              label={'새로운 닉네임'}
              value={nickName}
              validation={isValid.isNickName}
              helperText={helperText.ofNickName}
              onChange={handleInputChange}
              required={true}
            />
            <NTextField
              id="phoneNumber"
              type="text"
              label={'휴대전화'}
              maxLength={13}
              value={phoneNumber}
              validation={isValid.isPhoneNumber}
              helperText={helperText.ofPhoneNumber}
              onChange={handleInputChange}
              required={true}
            />
            <NTextField
              id="pw"
              type="password"
              label={'새로운 패스워드'}
              value={pw}
              validation={isValid.isPw}
              helperText={helperText.ofPw}
              onChange={handleInputChange}
              required={true}
            />
            <NTextField
              id="pwConfirm"
              type="password"
              label={'패스워드 확인'}
              value={pwConfirm}
              validation={isValid.isPwConfirm}
              helperText={helperText.ofPwConfirm}
              onChange={handleInputChange}
              required={true}
            />
            <FormButton
              type="submit"
              className="h-14 mt-4"
              variant="contained"
              content="회원가입"
              disabled={formValid ? false : true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
