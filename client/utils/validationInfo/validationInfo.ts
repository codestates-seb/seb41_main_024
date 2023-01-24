import { validationInfoType } from './validationInfoType';

const validationInfo: validationInfoType = {
  email: {
    regexPattern: new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    helperText: {
      default: '사용하실 이메일을 적어주세요.',
      verified: '올바른 이메일 양식입니다.',
      unverified: '이메일 양식에 맞춰 입력해 주세요.',
    },
  },
  nickName: {
    helperText: {
      default: '사용하실 닉네임을 적어주세요.',
    },
  },
  phoneNumber: {
    helperText: {
      default: '핸드폰 번호를 적어주세요.',
    },
  },
  pw: {
    regexPattern: new RegExp('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{8,})'),
    helperText: {
      default: '소문자, 특수문자 포함 8자 이상이어야 합니다.',
      verified: '올바른 비밀번호 양식입니다.',
      unverified: '소문자, 특수문자 포함 8자 이상 입력해 주세요.',
    },
  },
  pwConfirm: {
    helperText: {
      default: '비밀번호를 한 번 더 입력해 주세요.',
      verified: '비밀번호와 일치합니다.',
      unverified: '동일한 비밀번호를 입력해 주세요.',
    },
  },
};

export default validationInfo;
