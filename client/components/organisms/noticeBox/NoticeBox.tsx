import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Button } from '@mui/material';
import Link from 'next/link';

const NoticeBox = ({
  className,
  message,
  linkText,
  linkHref,
}: {
  className?: string;
  message: string;
  linkText?: string;
  linkHref?: string;
}) => {
  return (
    <span className={`flex flex-col items-center py-[7.5rem] ${className}`}>
      <ErrorOutlineOutlinedIcon className="text-[4rem] text-grey" />
      <strong className="mt-[0.4rem] text-center font-normal text-base">
        {message}
      </strong>
      {linkText && (
        <span className="block mt-[1.25rem]">
          <Button
            href={linkHref}
            component="a"
            variant="contained"
            LinkComponent={Link}
          >
            {linkText}
          </Button>
        </span>
      )}
    </span>
  );
};
export default NoticeBox;
