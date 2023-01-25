export interface mainHeaderType {
  isLogin: boolean;
  nickName: string | undefined;
  logOutHandler: () => void;
  session: {
    data: {
      user: {
        name: string;
        email: string;
        image: string;
      };
      accessToken: string;
      expires: string;
    };
    status: string;
  };
}
