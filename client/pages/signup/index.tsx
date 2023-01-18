import { ReactComponent as Logo } from '../../public/logos/logoRow.svg';
import UserInfoForm from '../../components/molecules/userInfoForm/UserInfoForm';

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
  return (
    <div>
      <div className="mt-24">
        <SignupSlogan />
      </div>
      <div className="m-7 my-12">
        <UserInfoForm editPage={false} content="회원가입" />
      </div>
    </div>
  );
};

export default SignupPage;
