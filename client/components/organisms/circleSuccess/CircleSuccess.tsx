const CircleSuccess = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <span
      className={`flex flex-col items-center py-[7.5rem] ani_fadeIn ${className}`}
    >
      <span className="relative w-[3.3125rem] h-[3.3125rem] m-[0.3125rem] rounded-full bg-[#2EB150]">
        <span className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-60%] h-[1.875rem] w-[0.9375rem] border-[0.3125rem] border-t-[#fff] border-l-[#fff] border-b-0 border-r-0 border-solid rounded-sm rotate-[-135deg]"></span>
      </span>
      {message && (
        <strong className="block mt-[0.4rem] text-center font-normal text-base">
          {message}
        </strong>
      )}
    </span>
  );
};
export default CircleSuccess;
