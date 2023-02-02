import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import FormButton from '../../components/molecules/formbutton/FormButton';
import NTextField from '../../components/organisms/nTextField/NTextField';
import useValidation from '../../hooks/common/useValidation';
import validationInfo from '../../utils/validationInfo/validationInfo';
import postSignup from '../../api/postSignup';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import postUserEqualCheck from '../../api/postUserEqualCheck';
import createProfileRandomUrl from '../../utils/createProfileRandomUrl/createProfileRandomUrl';
import RandomProfile from '../../components/organisms/randomProfile/RandomProfile';
import CircleLoading from '../../components/organisms/circleLoading/CircleLoading';
import SadErrorBox from '../../components/organisms/sadErrorBox/SadErrorBox';
import CircleSuccess from '../../components/organisms/circleSuccess/CircleSuccess';
import axios from 'axios';
import Input from '../../components/atoms/input/Input';

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

type formValueType = {
  [name: string]: string;
  email: string;
  nickName: string;
  phoneNumber: string;
  pw: string;
  imageLink: string;
};

const randomProfile = createProfileRandomUrl(15);

const SignupPage = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<formValueType>({
    email: '',
    nickName: '',
    phoneNumber: '',
    pw: '',
    imageLink: randomProfile,
  });
  const [pwConfirm, setPwConfirm] = useState('');
  const { email, nickName, pw, phoneNumber } = formValue;
  const [profileUrl, setProfileUrl] = useState(randomProfile);
  const { helperText, isValid, formValid } = useValidation(
    formValue,
    pwConfirm,
    validationInfo
  );
  const [formEqualCheck, setFormEqualCheck] = useState({
    email: false,
    nickName: false,
    phoneNumber: false,
  });
  const [equalClickedCheck, setEqualClickedCheck] = useState({
    email: false,
    nickName: false,
    phoneNumber: false,
  });
  const [isEqualsError, setIsEqualsError] = useState({
    email: false,
    nickName: false,
    phoneNumber: false,
  });
  const [isEmailConfirm, setIsEmailConfirm] = useState({
    code: '',
    inputValue: '',
    onProcess: false,
    isLoading: false,
    isMatched: false,
    messageState: true,
  });
  const [isAllEquals, setIsAllEquals] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsAllEquals(
      formEqualCheck.email &&
        formEqualCheck.nickName &&
        formEqualCheck.phoneNumber
    );
  }, [formEqualCheck]);

  useEffect(() => {
    setFormValue({
      ...formValue,
      imageLink: profileUrl,
    });
  }, [profileUrl]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    const updatedFormValue = { ...formValue, [id]: value };
    const updatedFormEqualCheck = { ...formEqualCheck, [id]: false };
    const updatedEqualClickedCheck = { ...equalClickedCheck, [id]: false };
    const updatedIsEqualsError = { ...isEqualsError, [id]: false };

    setFormValue(updatedFormValue);
    setFormEqualCheck(updatedFormEqualCheck);
    setEqualClickedCheck(updatedEqualClickedCheck);
    setIsEqualsError(updatedIsEqualsError);

    if (id === 'phoneNumber') {
      setFormValue({
        ...updatedFormValue,
        [id]: value
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(\-{1,2})$/g, ''),
      });
    }
    if (id === 'pwConfirm') {
      setPwConfirm(value);
    }
    if (id === 'confirmCode') {
      setIsEmailConfirm({
        ...isEmailConfirm,
        inputValue: event.target.value,
      });
    }
  };

  const handleClickRandomProfile = async () => {
    setProfileUrl(createProfileRandomUrl(15));
  };

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
        .then(() => {
          if (inpName === 'email') {
            setFormEqualCheck({
              ...formEqualCheck,
              email: false,
            });
            setIsEmailConfirm({
              ...isEmailConfirm,
              isLoading: true,
            });
            axios
              .post(`https://ngether.site/api/emailConfirm?email=${email}`)
              .then((res) => {
                setIsEmailConfirm({
                  ...isEmailConfirm,
                  isLoading: false,
                  code: res.data,
                  onProcess: true,
                });
              })
              .catch(() => {
                setIsError(true);
              });
          }
        })
        .catch((error) => {
          if ([417, 418, 419].includes(error.response.status)) {
            setIsEqualsError({
              ...isEqualsError,
              [inpName]: true,
            });
          }
        });
    }
  };

  const onEmailCodeCheckHandler = () => {
    if (isEmailConfirm.code === isEmailConfirm.inputValue) {
      setFormEqualCheck({
        ...formEqualCheck,
        email: true,
      });
      setIsEmailConfirm({
        ...isEmailConfirm,
        isMatched: true,
        onProcess: false,
      });
      setFormEqualCheck({
        ...formEqualCheck,
        email: true,
      });
    } else {
      setIsEmailConfirm({
        ...isEmailConfirm,
        messageState: false,
      });
    }
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    await postSignup(formValue)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setIsSuccess(true);
      })
      .then((res) => {
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      })
      .catch((error) => {
        setIsError(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        console.log(`다음과 같은 오류 ${error}가 발생했습니다:`);
      });
  };

  return (
    <>
      {!isLoading && !isError && !isSuccess && (
        <div className="ani_fadeIn w-full">
          <div className="mt-24">
            <SignupSlogan />
          </div>
          <div className="mt-5 mb-12 mx-7">
            <div className="flex justify-center mb-[3.75rem]">
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
                    required={true}
                  />
                  <div className="flex justify-end">
                    <p className="flex items-center text-[#777] text-[0.75rem] mr-[0.875rem] ml-[0.875rem] screen-maxw530:mr-auto">
                      {!equalClickedCheck.email && (
                        <span className="ani_fadeIn">인증해주세요</span>
                      )}
                      {equalClickedCheck.email &&
                        !formEqualCheck.email &&
                        formValue.email !== '' &&
                        !isEmailConfirm.onProcess &&
                        !isEmailConfirm.isLoading && (
                          <span className="text-[#F8719D] ani_fadeIn">
                            사용중인 이메일 입니다.
                          </span>
                        )}
                      {equalClickedCheck.email &&
                        formEqualCheck.email &&
                        !isEqualsError.email &&
                        isEmailConfirm.isMatched && (
                          <span className="text-[#2EB150] ani_fadeIn">
                            사용가능 합니다.
                          </span>
                        )}
                    </p>
                    {!isEmailConfirm.isLoading &&
                      !isEmailConfirm.onProcess &&
                      !isEmailConfirm.isMatched && (
                        <Button
                          onClick={(event) => {
                            equalcheck('email');
                          }}
                          className="p-0 text-[0.75rem]"
                        >
                          이메일 인증 전송
                        </Button>
                      )}
                    {isEmailConfirm.isLoading && (
                      <span className="block m-[0.3125rem] animate-spin w-[1.3125rem] h-[1.3125rem] rounded-full border-[0.3125rem] border-t-[#63A8DA] border-l-[#63A8DA] border-b-[#63A8DA] border-r-transparent border-solid" />
                    )}
                    {isEmailConfirm.onProcess && (
                      <>
                        {!isEmailConfirm.messageState && (
                          <p className="flex items-center justify-center mr-2">
                            <span className="text-[#F8719D] ani_fadeIn">
                              인증번호가 일치하지 않습니다.
                            </span>
                          </p>
                        )}
                        <Input
                          id="confirmCode"
                          name="confirmCode"
                          type="text"
                          label="인증번호"
                          value={isEmailConfirm.inputValue}
                          onChange={handleInputChange}
                        />
                        <Button
                          className="p-0 text-[0.75rem]"
                          onClick={onEmailCodeCheckHandler}
                        >
                          인증하기
                        </Button>
                      </>
                    )}
                  </div>
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
                        formValue.nickName !== '' &&
                        isEqualsError.nickName && (
                          <span className="text-[#F8719D] ani_fadeIn">
                            사용중인 닉네임 입니다.
                          </span>
                        )}
                      {equalClickedCheck.nickName &&
                        formEqualCheck.nickName && (
                          <span className="text-[#2EB150] ani_fadeIn">
                            사용가능 합니다.
                          </span>
                        )}
                    </p>
                    <Button
                      onClick={(event) => {
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
                        formValue.phoneNumber !== '' &&
                        isEqualsError.phoneNumber && (
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
                  content="회원가입"
                  disabled={formValid && isAllEquals ? false : true}
                />
              </form>
            </div>
          </div>
        </div>
      )}
      {isLoading && !isError && (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <CircleLoading message="잠시만 기다려 주세요." />
        </div>
      )}
      {!isLoading && !isError && isSuccess && (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <CircleSuccess message="회원가입 완료! 로그인 페이지로 이동합니다." />
        </div>
      )}
      {!isLoading && isError && (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <SadErrorBox />
        </div>
      )}
    </>
  );
};

export default SignupPage;
