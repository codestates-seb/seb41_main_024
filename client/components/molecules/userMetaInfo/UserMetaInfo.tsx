import React from 'react';
// import Button from '../../atoms/button/Button';
import { productDataProps } from './userMetaInfoType';
import Link from 'next/link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ModalComponent from '../../organisms/modal/Modal';

const UserMetaInfo = ({
  productData,
  handleDelete,
  isWriter,
  id,
  handleComplete,
  isOpen,
  handleGoEdit,
  isDeleteModalOpen,
  handleIsDeleteModalOpen,
  handleIsDeleteModalClose,
  isCompleteModalOpen,
  handleIsCompleteModalOpen,
  handleIsCompleteModalClose,
}: productDataProps) => {
  console.log(isOpen);
  return (
    <div>
      <ModalComponent
        modalOpen={isDeleteModalOpen}
        handleClose={handleIsDeleteModalClose}
        title="해당 게시물을 삭제하시겠습니까? 삭제된 게시물은 복구되지 않습니다"
        onClick={handleDelete}
        positiveResponse="예 삭제하겠습니다"
        positiveColor={'red'}
        negativeResponse="취소"
        negativeColor={'black'}
      />
      <ModalComponent
        modalOpen={isCompleteModalOpen}
        handleClose={handleIsCompleteModalClose}
        title="모집을 마감하시겠습니까? 모집을 마감하면 더 이상 다른 유저들이 참여할 수 없습니다."
        onClick={handleComplete}
        positiveResponse="예 마감하겠습니다"
        positiveColor={'#63A8DA'}
        negativeResponse="취소"
        negativeColor={'red'}
      />
      <Box sx={{ my: 3, mx: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack>
              <div className="bg-orange-100 w-14 h-14 p-1.5 rounded-lg">
                <img src="https://avatars.dicebear.com/api/bottts/122.svg" />
              </div>
            </Stack>
            <Stack direction="column">
              <strong className="text-base">{productData?.nickname}</strong>
              <p>{productData?.address}</p>
            </Stack>
          </Stack>
          <Stack>
            {isWriter && isOpen && (
              <Button
                onClick={handleIsCompleteModalOpen}
                variant="contained"
                className="m-2"
              >
                모집 마감하기
              </Button>
            )}
            {isWriter && !isOpen && (
              <Button disabled variant="contained" className="m-2">
                모집 마감하기
              </Button>
            )}
            {isWriter && (
              <div className={'flex items-center'}>
                <Button
                  variant="outlined"
                  size="small"
                  className="m-1"
                  onClick={() => handleGoEdit(id)}
                >
                  수정
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className="m-1"
                  onClick={handleIsDeleteModalOpen}
                >
                  삭제
                </Button>
              </div>
            )}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default UserMetaInfo;
