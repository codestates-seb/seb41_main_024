import NTextField from '../../organisms/nTextField/NTextField';
import FormButton from '../../molecules/formbutton/FormButton';
import validationInfo from '../../../utils/validationInfo/validationInfo';
import { useEffect, useState } from 'react';
import useValidation from '../../../hooks/common/useValidation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import getOneUserData from '../../../api/getOneUserData';
import Loading from '../../organisms/loading/Loading';
import patchOneUserInfo from '../../../utils/patchOneUserInfo/patchOneUserInfo';

const EditUserInfo = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getOneUserData,
    onSuccess(data) {
      console.log(data);
    },
  });
  const [formValue, setFormValue] = useState({
    email: '',
    nickName: '',
    phoneNumber: '',
    pw: '',
  });
  const [pwConfirm, setPwConfirm] = useState('');
  const { email, nickName, pw, phoneNumber } = formValue;
  const { helperText, isValid } = useValidation(
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

  useEffect(() => {
    setFormValue({
      email: data?.data.email,
      nickName: data?.data.nickName,
      phoneNumber: data?.data.phoneNumber,
      pw: '',
    });
  }, [data]);

  const patchOneUserQuery = patchOneUserInfo(formValue, useQueryClient());

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    patchOneUserQuery.mutate();
  };
  return (
    <div>
      {data && (
        <div className="flex justify-center mt-7 mb-[3.75rem]">
          <form
            className="flex flex-col justify-center w-10/12 max-w-lg"
            onSubmit={onSubmitHandler}
          >
            <img
              className="h-40 w-40 mb-7 m-auto"
              src="/imageBox/base-box.svg"
              alt=""
            />
            <NTextField
              id="email"
              type="email"
              label={'이메일'}
              value={email}
              validation={isValid.isEmail}
              helperText={helperText.ofEmail}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') event.preventDefault();
              }}
              disabled={true}
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
              content="수정하기"
            />
            <FormButton
              type="button"
              className="h-14 mt-4"
              variant="outlined"
              content="회원탈퇴"
            />
          </form>
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default EditUserInfo;
