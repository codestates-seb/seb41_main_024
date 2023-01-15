import { ReactComponent as Logo } from '../../../../public/logos/logoRow.svg';
const MainSlogan = () => {
  return (
    <div className="flex flex-col items-center">
      <Logo />
      <p className="pt-px mt-4 text-lg">
        <strong className="text-primary font-bold">필요</strong>한 만큼만,
        <strong className="text-primary font-bold"> 구매</strong>의 새로운 방법
      </p>
      <p className="pb-px text-lg">
        Find your
        <strong className="text-primary font-bold"> shopping mate</strong>
      </p>
    </div>
  );
};
export default MainSlogan;
