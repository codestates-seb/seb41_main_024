const CircleLoading = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <span
      className={`flex flex-col animate-ping items-center py-[7.5rem] ani_fadeIn ${className}`}
    >
      <span className="block m-[0.3125rem] animate-spin w-[3.3125rem] h-[3.3125rem] rounded-full border-[0.3125rem] border-t-[#63A8DA] border-l-[#63A8DA] border-b-[#63A8DA] border-r-transparent border-solid">
        <em className="absolute overflow-hidden w-0 h-0 leading-none indent-[-9999px]">
          데이터를 불러오는 중 입니다.
        </em>
      </span>
      {message && (
        <strong className="block mt-[0.4rem] text-center font-normal text-base">
          {message}
        </strong>
      )}
    </span>
  );
};
export default CircleLoading;
