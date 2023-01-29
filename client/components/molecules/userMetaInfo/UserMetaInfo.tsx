import React from 'react';
// import Button from '../../atoms/button/Button';
import { productDataProps } from './userMetaInfoType';
import Link from 'next/link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const UserMetaInfo = ({
  productData,
  handleDelete,
  isWriter,
  id,
  handleComplete,
  isOpen,
  handleGoEdit,
}: productDataProps) => {
  console.log(isOpen);
  return (
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
              variant="outlined"
              size="small"
              onClick={handleComplete}
              className="m-1 "
            >
              모집마감
            </Button>
          )}
          {/* {isWriter && !isOpen && (
        <Button disabled className="p-1">
          모집 마감
        </Button>
      )} */}
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
                onClick={handleDelete}
              >
                삭제
              </Button>
            </div>
          )}
        </Stack>
      </Stack>
      <Divider variant="middle" />
    </Box>
  );
};

export default UserMetaInfo;
