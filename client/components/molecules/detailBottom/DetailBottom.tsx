import FormButton from '../formbutton/FormButton';
import React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Cookie } from '@mui/icons-material';
import { DetailBottomPropsType } from './detailBottomType';
import ModalComponent from '../../organisms/modal/Modal';
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DialogMaker from '../../organisms/dialogMaker/DialogMaker';

const DetailBottom = ({
  isOpen,
  isWriter,
  isAdmin,
  handleUserBlock,
  handleReport,
  handleGether,
  isReportModalOpen,
  handleReportModalOpen,
  handleReportModalClose,
  handleComplete,
  isGetherModalOpen,
  handleGetherModalOpen,
  handleGetherModalClose,
  isCompleteModalOpen,
  handleIsCompleteModalOpen,
  handleIsCompleteModalClose,
  isLiked,
  handleLike,
  isReported,
  isMySharing,
}: DetailBottomPropsType) => {
  return (
    <div>
      <ModalComponent
        modalOpen={isReportModalOpen}
        handleClose={handleReportModalClose}
        title="해당 게시물을 신고하시겠습니까? 신고 즉시 게시물이 노출되지 않습니다."
        onClick={handleReport}
        positiveResponse="예 신고하겠습니다"
        positiveColor={'red'}
        negativeResponse="취소"
        negativeColor={'black'}
      />
      <ModalComponent
        modalOpen={isGetherModalOpen}
        handleClose={handleGetherModalClose}
        title="공동 구매에 참여하시면 공동구매 채팅방으로 이동됩니다. 이웃들과 함께 세부사항을 논의해보세요! "
        onClick={handleGether}
        positiveResponse="예 참여하겠습니다"
        positiveColor={'#63A8DA'}
        negativeResponse="취소"
        negativeColor={'red'}
      />

      <Box sx={{ my: 0, mx: 0 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-center"
          spacing={2}
        >
          {isOpen && isMySharing && !isWriter && !isAdmin && (
            <Button
              onClick={handleGetherModalOpen}
              variant="contained"
              className=""
            >
              채팅방 가기
            </Button>
          )}
          {isOpen && !isMySharing && !isWriter && !isAdmin && (
            <Button
              onClick={handleGetherModalOpen}
              variant="contained"
              className=""
            >
              참여하기
            </Button>
          )}
          {!isOpen && !isMySharing && !isWriter && !isAdmin && (
            <Button disabled variant="contained" className="">
              참여하기
            </Button>
          )}
          {!isReported && !isWriter && !isAdmin && (
            <Button
              onClick={handleReportModalOpen}
              variant="contained"
              className="bg-[red]"
            >
              신고하기
            </Button>
          )}
          {isReported && !isWriter && !isAdmin && (
            <Button disabled variant="contained" className="bg-[red]">
              신고하기
            </Button>
          )}
          {isAdmin && (
            <DialogMaker
              name={'유저 정지하기'}
              title={'이 유저를 정지하시겠습니까?'}
              variant="contained"
              className="bg-[red]"
              func={handleUserBlock}
            />
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default DetailBottom;
