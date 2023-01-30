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
};

const SignupPage = () => {
  const [formValue, setFormValue] = useState<formValueType>({
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
  const [isAllEquals, setIsAllEquals] = useState(false);
  useEffect(() => {
    setIsAllEquals(
      formEqualCheck.email &&
        formEqualCheck.nickName &&
        formEqualCheck.phoneNumber
    );
  }, [formEqualCheck]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    if (id === 'email') {
      setFormValue({
        ...formValue,
        email: value,
      });
      setFormEqualCheck({
        ...formEqualCheck,
        email: false,
      });
      setEqualClickedCheck({
        ...formEqualCheck,
        email: false,
      });
    } else if (id === 'nickName') {
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
    } else if (id === 'pwConfirm') {
      setPwConfirm(value);
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

  const equalcheck = async (inpName: string) => {
    const enteredData = {
      [inpName]: formValue[inpName],
    };
    setEqualClickedCheck({
      ...formEqualCheck,
      [inpName]: true,
    });
    if (formValue[inpName] !== '') {
      try {
        await postUserEqualCheck(enteredData).then((res) => {
          setFormEqualCheck({
            ...formEqualCheck,
            [inpName]: res.data,
          });
        });
      } catch (error) {
        console.log(`다음과 같은 오류  ${error}가 발생했습니다:`);
      }
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
                    <span className="ani_fadeIn">중복 확인 해주세요.</span>
                  )}
                  {equalClickedCheck.email &&
                    !formEqualCheck.email &&
                    formValue.email !== '' && (
                      <span className="text-[#F8719D] ani_fadeIn">
                        사용중인 이메일 입니다.
                      </span>
                    )}
                  {equalClickedCheck.email && formEqualCheck.email && (
                    <span className="text-[#2EB150] ani_fadeIn">
                      사용가능 합니다.
                    </span>
                  )}
                </p>
                <Button
                  onClick={() => {
                    equalcheck('email');
                  }}
                  className="p-0 text-[0.75rem]"
                >
                  이메일 중복 확인
                </Button>
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
              content="회원가입"
              disabled={isAllEquals ? false : true}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
