import FormButton from '../formbutton/FormButton';
import React from 'react';
import Button from '../../atoms/button/Button';
import Image from 'next/image';
import Link from 'next/link';

const DetailBottom = ({ isLiked, handleLike, handleReport, id }) => {
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
      <span>22,000원</span>
      <Button
        onClick={handleReport}
        variant="contained"
        className="bg-[#FF0000] m-2"
      >
        신고하기
      </Button>
      <Link href={`/chatroom/${id}`}>
        <FormButton variant="contained" content="참여하기" />
      </Link>
    </div>
  );
};

export default DetailBottom;
