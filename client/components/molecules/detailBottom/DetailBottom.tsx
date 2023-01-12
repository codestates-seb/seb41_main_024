import FormButton from '../../atoms/formbutton/FormButton';
import React from 'react';
import Button from '../../atoms/button/Button';

const DetailBottom = (props) => {
  return (
    <div className="flex justify-between items-center p-4">
      <Button
        src="/sharingList/favorite.svg"
        width={24}
        height={24}
        alt="좋아요"
      />
      <span>22,000원</span>
      <FormButton
        variant="contained"
        content="신고하기"
        className="bg-[#FF0000]"
      ></FormButton>
      <FormButton variant="contained" content="참여하기"></FormButton>
    </div>
  );
};

export default DetailBottom;
