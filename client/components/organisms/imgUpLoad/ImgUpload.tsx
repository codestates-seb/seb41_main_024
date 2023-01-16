import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { imgUploadType } from './imgUploadType';
import classnames from 'classnames';

const ImgUpload = ({ onChange, imgSrc }: imgUploadType) => {
  return (
    <div className="relative w-[9.75rem] h-[9.75rem]">
      <input
        className="absolute inset-0 opacity-[.01]"
        type="file"
        name="fileUp"
        id="fileUp"
        onChange={onChange}
      />
      {
        /* 이미지 넣는 부분 */
        imgSrc && (
          <img
            src={imgSrc}
            alt=""
            className="absolute top-0 left-0 object-cover w-full h-full"
          />
        )
      }
      <label
        htmlFor="fileUp"
        className={classnames(
          'absolute inset-0 flex justify-center items-center bg-black bg-opacity-[0.05] cursor-pointer transition-[background] duration-[300ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] group',
          { 'hover:bg-opacity-[0.1]': !imgSrc },
          { 'hover:bg-opacity-[0.2]': imgSrc }
        )}
      >
        <CameraAltOutlinedIcon
          className={classnames(
            'transition-[background] duration-[300ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)]',
            { 'text-[#eee] opacity-0 group-hover:opacity-1': imgSrc }
          )}
          color="disabled"
        />
      </label>
    </div>
  );
};

export default ImgUpload;
