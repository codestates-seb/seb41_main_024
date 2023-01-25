import { useEffect, useState } from 'react';
import { validationInfoType } from '../../utils/validationInfo/validationInfoType';

const useValidation = (
  formValue: {
    email: string;
    nickName: string;
    phoneNumber: string;
    pw: string;
  },
  pwConfirm: string,
  validationInfo: validationInfoType
) => {
  const [helperText, setHelperText] = useState({
    ofEmail: validationInfo.email.helperText.default,
    ofNickName: validationInfo.nickName.helperText.default,
    ofPhoneNumber: validationInfo.phoneNumber.helperText.default,
    ofPw: validationInfo.pw.helperText.default,
    ofPwConfirm: validationInfo.pwConfirm.helperText.default,
  });
  const [isValid, setIsValid] = useState({
    isEmail: true,
    isNickName: true,
    isPhoneNumber: true,
    isPw: true,
    isPwConfirm: true,
  });
  const [checkActiveValid, setCheckActiveValid] = useState({
    isEmail: false,
    isNickName: false,
    isPhoneNumber: false,
    isPw: false,
    isPwConfirm: false,
  });
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = validationInfo.email.regexPattern;
    if (formValue.email === '') {
      setHelperText({
        ...helperText,
        ofEmail: validationInfo.email.helperText.default,
      });
      setIsValid({ ...isValid, isEmail: true });
      setCheckActiveValid({ ...checkActiveValid, isEmail: false });
    } else if (emailRegex?.test(formValue.email)) {
      validationInfo.email.helperText.verified &&
        setHelperText({
          ...helperText,
          ofEmail: validationInfo.email.helperText.verified,
        });
      setIsValid({ ...isValid, isEmail: true });
      setCheckActiveValid({ ...checkActiveValid, isEmail: true });
    } else {
      validationInfo.email.helperText.unverified &&
        setHelperText({
          ...helperText,
          ofEmail: validationInfo.email.helperText.unverified,
        });
      setIsValid({ ...isValid, isEmail: false });
      setCheckActiveValid({ ...checkActiveValid, isEmail: true });
    }
  }, [formValue.email]);

  useEffect(() => {
    if (formValue.nickName === '') {
      setCheckActiveValid({ ...checkActiveValid, isNickName: false });
    } else {
      setCheckActiveValid({ ...checkActiveValid, isNickName: true });
    }
  }, [formValue.nickName]);

  useEffect(() => {
    if (formValue.phoneNumber === '') {
      setCheckActiveValid({ ...checkActiveValid, isPhoneNumber: false });
    } else {
      setCheckActiveValid({ ...checkActiveValid, isPhoneNumber: true });
    }
  }, [formValue.phoneNumber]);

  useEffect(() => {
    const pwRegex = validationInfo.pw.regexPattern;
    if (formValue.pw === '') {
      setHelperText({
        ...helperText,
        ofPw: validationInfo.pw.helperText.default,
      });
      setIsValid({ ...isValid, isPw: true });
      setCheckActiveValid({ ...checkActiveValid, isPw: false });
    } else if (pwRegex?.test(formValue.pw)) {
      validationInfo.pw.helperText.verified &&
        setHelperText({
          ...helperText,
          ofPw: validationInfo.pw.helperText.verified,
        });
      setIsValid({ ...isValid, isPw: true });
      setCheckActiveValid({ ...checkActiveValid, isPw: true });
    } else {
      validationInfo.pw.helperText.unverified &&
        setHelperText({
          ...helperText,
          ofPw: validationInfo.pw.helperText.unverified,
        });
      setIsValid({ ...isValid, isPw: false });
      setCheckActiveValid({ ...checkActiveValid, isPw: true });
    }
  }, [formValue.pw]);

  useEffect(() => {
    if (pwConfirm === '') {
      setHelperText({
        ...helperText,
        ofPwConfirm: validationInfo.pwConfirm.helperText.default,
      });
      setIsValid({ ...isValid, isPwConfirm: true });
      setCheckActiveValid({ ...checkActiveValid, isPwConfirm: false });
    } else if (formValue.pw === pwConfirm) {
      validationInfo.pwConfirm.helperText.verified &&
        setHelperText({
          ...helperText,
          ofPwConfirm: validationInfo.pwConfirm.helperText.verified,
        });
      setIsValid({ ...isValid, isPwConfirm: true });
      setCheckActiveValid({ ...checkActiveValid, isPwConfirm: true });
    } else {
      validationInfo.pwConfirm.helperText.unverified &&
        setHelperText({
          ...helperText,
          ofPwConfirm: validationInfo.pwConfirm.helperText.unverified,
        });
      setIsValid({ ...isValid, isPwConfirm: false });
      setCheckActiveValid({ ...checkActiveValid, isPwConfirm: true });
    }
  }, [pwConfirm]);

  useEffect(() => {
    if (
      isValid.isEmail &&
      isValid.isNickName &&
      isValid.isPhoneNumber &&
      isValid.isPw &&
      isValid.isPwConfirm &&
      checkActiveValid.isEmail &&
      checkActiveValid.isNickName &&
      checkActiveValid.isPhoneNumber &&
      checkActiveValid.isPw &&
      checkActiveValid.isPwConfirm
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [isValid, checkActiveValid]);

  return { helperText, isValid, formValid } as const;
};

export default useValidation;
