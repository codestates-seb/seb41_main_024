import FormButton from '../formbutton/FormButton';
import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Cookie } from '@mui/icons-material';
import { DetailBottomPropsType } from './detailBottomType';
import ModalComponent from '../../organisms/modal/Modal';
import Cookies from 'js-cookie';

const DetailBottom = ({
  isOpen,
  isLiked,
  isWriter,
  handleLike,
  handleReport,
  handleGether,
  modalOpen,
  handleModalOpen,
  handleClose,
  handleComplete,
}: DetailBottomPropsType) => {
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
      <div>
        <ModalComponent
          modalOpen={modalOpen}
          handleClose={handleClose}
          title="해당 게시물을 신고하시겠습니까? 신고 즉시 게시물이 노출되지 않습니다."
          onClick={handleReport}
          positiveResponse="예 신고하겠습니다"
          positiveColor={'red'}
          negativeResponse="취소"
          negativeColor={'black'}
        />
        <ModalComponent
          modalOpen={modalOpen}
          handleClose={handleClose}
          title="공동 구매에 참여하시면 공동구매 채팅방으로 이동됩니다. 이웃들과 함께 세부사항을 논의해보세요! "
          onClick={handleGether}
          positiveResponse="예 참여하겠습니다"
          positiveColor={'#63A8DA'}
          negativeResponse="취소"
          negativeColor={'red'}
        />

        {isOpen && !isWriter && (
          <Button onClick={handleModalOpen} variant="contained" className="m-2">
            참여하기
          </Button>
        )}
        {!isOpen && !isWriter && (
          <Button disabled variant="contained" className="m-2">
            참여하기
          </Button>
        )}
        {!isWriter && (
          <Button
            onClick={handleModalOpen}
            variant="contained"
            className="bg-[red] m-2"
          >
            신고하기
          </Button>
        )}
        {isWriter && isOpen && (
          <Button onClick={handleComplete} variant="contained" className="m-2">
            모집 마감하기
          </Button>
        )}
        {isWriter && !isOpen && (
          <Button disabled variant="contained" className="m-2">
            모집 마감하기
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailBottom;
