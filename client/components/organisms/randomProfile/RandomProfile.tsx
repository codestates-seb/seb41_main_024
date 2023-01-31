import AutorenewIcon from '@mui/icons-material/Autorenew';
import { IconButton } from '@mui/material';
import randomProfileType from './randomProfileType';

const RandomProfile = ({ profileUrl, onClick }: randomProfileType) => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="relative overflow-hidden border border-solid border-stone-300 h-40 w-40 mb-7 m-auto rounded">
          <img
            className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-full h-auto"
            src={profileUrl}
            alt=""
          />
        </div>
        <IconButton
          onClick={onClick}
          className="absolute bottom-[1.75rem] right-[-3.125rem] bg-primary text-white"
          sx={{
            '&:hover, &.Mui-focused': {
              bgcolor: (theme) => theme.palette.primary.main,
            },
          }}
          aria-label="프로필 사진 새로고침"
        >
          <AutorenewIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default RandomProfile;
