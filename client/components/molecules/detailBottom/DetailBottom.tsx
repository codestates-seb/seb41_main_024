import FormButton from '../formbutton/FormButton';
import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Cookie } from '@mui/icons-material';

const DetailBottom = ({
  isLiked,
  handleLike,
  handleReport,
  handleGether,
  id,
}) => {
  return (
    <div className="flex justify-between items-center p-4 mb-4 border-y-1 px-2 py-4 border-x-0 border-solid border-[#475569]">
      <Button onClick={handleLike}>
        {isLiked && (
          <Image
            src="/sharingList/favorite.svg"
            width={24}
            height={24}
            alt="좋아요"
          />
        )}
        {!isLiked && (
          <Image
            src="/sharingList/favorite_border.svg"
            width={24}
            height={24}
            alt="좋아요"
          />
        )}
      </Button>
      {/* <span>22,000원</span> */}
      <div>
        <Button
          onClick={handleReport}
          variant="contained"
          className="bg-[red] m-2"
        >
          신고하기
        </Button>
        <Button onClick={handleGether} variant="contained" className="m-2">
          참여하기
        </Button>
        {/* <Link href={`/chatroom/${id}`}>
          <FormButton variant="contained" content="참여하기" />
        </Link> */}
      </div>
    </div>
  );
};

export default DetailBottom;
