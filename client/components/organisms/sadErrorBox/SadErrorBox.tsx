import SickOutlinedIcon from '@mui/icons-material/SickOutlined';

const SadErrorBox = ({ className }: { className?: string }) => {
  return (
    <span
      className={`flex flex-col items-center py-[7.5rem] ani_fadeIn ${className}`}
    >
      <SickOutlinedIcon className="text-[4rem] text-[#ff6d00]" />
      <strong className="mt-[0.4rem] text-center font-normal text-base">
        서비스 문제가 발생했습니다. <br />
        <span className="text-[#ff6d00]">다음에 다시 이용해주세요.</span>
      </strong>
    </span>
  );
};
export default SadErrorBox;
