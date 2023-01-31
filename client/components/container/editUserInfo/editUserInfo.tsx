import NTextField from '../../organisms/nTextField/NTextField';
import FormButton from '../../molecules/formbutton/FormButton';
import validationInfo from '../../../utils/validationInfo/validationInfo';
import { useEffect, useState } from 'react';
import useValidation from '../../../hooks/common/useValidation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import getOneUserData from '../../../api/getOneUserData';
import patchOneUserInfo from '../../../utils/patchOneUserInfo/patchOneUserInfo';
import { Button } from '@mui/material';
import postUserEqualCheck from '../../../api/postUserEqualCheck';
import createProfileRandomUrl from '../../../utils/createProfileRandomUrl/createProfileRandomUrl';
import RandomProfile from '../../organisms/randomProfile/RandomProfile';
import CircleLoading from '../../organisms/circleLoading/CircleLoading';

type formValueType = {
  [name: string]: string;
  email: string;
  nickName: string;
  phoneNumber: string;
  pw: string;
};

const EditUserInfo = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getOneUserData,
    onSuccess(data) {
      console.log(data);
    },
  });
  const [formValue, setFormValue] = useState<formValueType>({
    email: '',
    nickName: '',
    phoneNumber: '',
    pw: '',
    imageLink: '',
  });
  const [pwConfirm, setPwConfirm] = useState('');
  const { email, nickName, pw, phoneNumber } = formValue;
  const [profileUrl, setProfileUrl] = useState('');
  const {
    helperText,
    isValid,
    checkActiveValid,
    setIsValid,
    setCheckActiveValid,
    formValid,
  } = useValidation(formValue, pwConfirm, validationInfo);
  const [formEqualCheck, setFormEqualCheck] = useState({
    nickName: false,
    phoneNumber: false,
  });
  const [equalClickedCheck, setEqualClickedCheck] = useState({
    nickName: false,
    phoneNumber: false,
  });
  const [isEqualsError, setIsEqualsError] = useState({
    nickName: false,
    phoneNumber: false,
  });
  const [isAllEquals, setIsAllEquals] = useState(false);
  useEffect(() => {
    setIsAllEquals(formEqualCheck.nickName && formEqualCheck.phoneNumber);
  }, [formEqualCheck]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    if (id === 'nickName') {
      setFormValue({
        ...formValue,
        nickName: value,
      });
      setFormEqualCheck({
        ...formEqualCheck,
        nickName: false,
      });
      setEqualClickedCheck({
        ...formEqualCheck,
        nickName: false,
      });
      setIsEqualsError({
        ...isEqualsError,
        nickName: false,
      });
    } else if (id === 'phoneNumber') {
      setFormValue({
        ...formValue,
        [id]: value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, ''),
      });
      setFormEqualCheck({
        ...formEqualCheck,
        phoneNumber: false,
      });
      setEqualClickedCheck({
        ...formEqualCheck,
        phoneNumber: false,
      });
      setIsEqualsError({
        ...isEqualsError,
        phoneNumber: false,
      });
    } else if (id === 'pwConfirm') {
      setPwConfirm(value);
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
      imageLink: data?.data.imageLink,
      pw: '',
    });
    setProfileUrl(data?.data.imageLink);
    setPwConfirm('');
    setIsValid({ ...isValid, isEmail: true }),
      setCheckActiveValid({ ...checkActiveValid, isEmail: true });
  }, [data]);

  const patchOneUserQuery = patchOneUserInfo(formValue, useQueryClient());

  const handleClickRandomProfile = () => {
    setProfileUrl(createProfileRandomUrl(15));
  };
  useEffect(() => {
    setFormValue({
      ...formValue,
      imageLink: profileUrl,
    });
  }, [profileUrl]);

  const equalcheck = async (inpName: string) => {
    const enteredData = {
      [inpName]: formValue[inpName],
    };
    setEqualClickedCheck({
      ...formEqualCheck,
      [inpName]: true,
    });
    if (formValue[inpName] !== '') {
      await postUserEqualCheck(enteredData)
        .then((res) => {
          setFormEqualCheck({
            ...formEqualCheck,
            [inpName]: res.data,
          });
        })
        .catch((error) => {
          if (error.response.status === 419) {
            setIsEqualsError({
              ...isEqualsError,
              [inpName]: true,
            });
          }
        });
    }
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    patchOneUserQuery.mutate();
  };
  return (
    <div>
      {data && (
        <div className="flex justify-center mt-7 mb-[3.75rem] ani_fadeIn">
          <form
            className="flex flex-col justify-center w-10/12 max-w-lg"
            onSubmit={onSubmitHandler}
          >
            <RandomProfile
              onClick={handleClickRandomProfile}
              profileUrl={profileUrl}
            />
            <div className="mb-[1.3rem] last:mb-0">
              <NTextField
                id="email"
                type="email"
                label={'이메일'}
                value={email}
                validation={isValid.isEmail}
                helperText={helperText.ofEmail}
                onChange={handleInputChange}
                disabled={true}
              />
            </div>
            <div className="mb-[1.3rem] last:mb-0">
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
              <div className="flex justify-end">
                <p className="flex items-center text-[#777] text-[0.75rem] mr-[0.875rem] ml-[0.875rem] screen-maxw530:mr-auto">
                  {!equalClickedCheck.nickName && (
                    <span className="ani_fadeIn">중복 확인 해주세요.</span>
                  )}
                  {equalClickedCheck.nickName &&
                    !formEqualCheck.nickName &&
                    formValue.nickName !== '' && (
                      <span className="text-[#F8719D] ani_fadeIn">
                        사용중인 닉네임 입니다.
                      </span>
                    )}
                  {equalClickedCheck.nickName && formEqualCheck.nickName && (
                    <span className="text-[#2EB150] ani_fadeIn">
                      사용가능 합니다.
                    </span>
                  )}
                </p>
                <Button
                  onClick={() => {
                    equalcheck('nickName');
                  }}
                  className="p-0 text-[0.75rem]"
                >
                  닉네임 중복 확인
                </Button>
              </div>
            </div>
            <div className="mb-[1.3rem] last:mb-0">
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
              <div className="flex justify-end">
                <p className="flex items-center text-[#777] text-[0.75rem] mr-[0.875rem] ml-[0.875rem] screen-maxw530:mr-auto">
                  {!equalClickedCheck.phoneNumber && (
                    <span className="ani_fadeIn">중복 확인 해주세요.</span>
                  )}
                  {equalClickedCheck.phoneNumber &&
                    !formEqualCheck.phoneNumber &&
                    formValue.phoneNumber !== '' && (
                      <span className="text-[#F8719D] ani_fadeIn">
                        사용중인 핸드폰 입니다.
                      </span>
                    )}
                  {equalClickedCheck.phoneNumber &&
                    formEqualCheck.phoneNumber && (
                      <span className="text-[#2EB150] ani_fadeIn">
                        사용가능 합니다.
                      </span>
                    )}
                </p>
                <Button
                  onClick={() => {
                    equalcheck('phoneNumber');
                  }}
                  className="p-0 text-[0.75rem]"
                >
                  휴대전화 중복 확인
                </Button>
              </div>
            </div>
            <div className="mb-[1.3rem] last:mb-0">
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
            </div>
            <div className="mb-[1.3rem] last:mb-0">
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
            </div>
            <FormButton
              type="submit"
              className="h-14 mt-4"
              variant="contained"
              content="수정하기"
              disabled={formValid && isAllEquals ? false : true}
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
      {isLoading && <CircleLoading message="잠시만 기다려 주세요." />}
    </div>
  );
};

export default EditUserInfo;
