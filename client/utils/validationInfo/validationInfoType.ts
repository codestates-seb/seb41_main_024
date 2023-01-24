export interface validationType {
  regexPattern?: RegExp;
  helperText: {
    default: string;
    verified?: string;
    unverified?: string;
  };
}

export interface validationInfoType {
  email: validationType;
  nickName: validationType;
  phoneNumber: validationType;
  pw: validationType;
  pwConfirm: validationType;
}
