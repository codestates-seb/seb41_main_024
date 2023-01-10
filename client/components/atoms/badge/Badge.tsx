// import { badgePropsType } from './Type_badge';

type badgeProps = {
  isOpen: boolean;
};

const Badge = (isOpen: badgeProps) => {
  return (
    <>
      {isOpen ? (
        <div className="flex justify-center items-center w-16 h-6 rounded-md bg-sky-500">
          <p className="text-xs text-white">모집 중</p>
        </div>
      ) : (
        <div className="flex justify-center items-center w-16 h-6 rounded-md bg-slate-400">
          <p className="text-xs text-white">모집 완료</p>
        </div>
      )}
    </>
  );
};

export default Badge;
