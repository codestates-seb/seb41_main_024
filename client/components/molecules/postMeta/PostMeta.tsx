import Link from 'next/link';
import ElapsedTime from '../elapsedTime/ElapsedTime';
import { PostMetaType } from './postMetaType';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import { bgcolor } from '@mui/system';

const PostMeta = ({ productData, isLiked, handleLike }: PostMetaType) => {
  return (
    <Box sx={{ my: 3, mx: 2 }}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack spacing={1}>
            <strong className="text-xl font-medium">
              {productData?.title}
            </strong>
            <p className="text-sm text-[#475569]">
              {productData?.category === 'product'
                ? '상품 쉐어링'
                : '배달 쉐어링'}
              •
              <ElapsedTime createDate={productData?.createDate} />
            </p>
            <strong className="text-lg font-medium">
              {productData?.price.toLocaleString()}원 (배송비포함)
            </strong>
          </Stack>
          <Stack>
            <Button onClick={handleLike}>
              {isLiked && (
                <Image
                  src="/sharingList/favorite.svg"
                  width={26}
                  height={26}
                  alt="좋아요"
                />
              )}
              {!isLiked && (
                <Image
                  src="/sharingList/favorite_border.svg"
                  width={26}
                  height={26}
                  alt="좋아요"
                />
              )}
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            p: 4,
            my: 3,
            borderRadius: '10px',
            backgroundColor: '#efece6',
          }}
        >
          <Stack spacing={2}>
            <p className="text-sm text-[#475569">
              [모집기간] ~ {productData?.deadLine}까지
            </p>
            <p className="text-sm text-[#475569]">
              현재 모집인원 {productData?.curNum}명 / 총 모집인원
              {productData?.maxNum}명
            </p>
            <p className="text-sm text-[#475569]">
              [참여시 예상금액]{' '}
              {productData &&
                (
                  productData?.price /
                  (productData?.curNum + 1)
                ).toLocaleString()}
              원
            </p>
            <Link
              href={productData?.productsLink || ''}
              target="_blank"
              className="truncate text-sm text-[#475569] mb-4 block"
            >
              [판매 제품 링크] {productData?.productsLink}
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>

    // <div className="ml-4 mt-6">
    //   <div className="mb-2.5">
    //     <strong className="text-xl font-medium">{productData?.title}</strong>
    //   </div>
    //   <p className="text-sm text-[#475569] mb-4">
    //     {productData?.category}•
    //     <ElapsedTime createdAt={productData?.createDate} />
    //   </p>
    //   <div className=" mb-2.5">
    //     <strong className="text-lg font-medium">
    //       {productData?.price.toLocaleString()}원(배송비포함)
    //     </strong>
    //   </div>
    //   <p className="text-sm text-[#475569] mb-4">
    //     모집기간: ~{productData?.deadLine}
    //   </p>
    //   <p className="text-sm text-[#475569] mb-4">
    //     현재 모집인원: {productData?.curNum}명 / 총 모집인원:
    //     {productData?.maxNum}명
    //   </p>
    //   <p className="text-sm text-[#475569] mb-4">
    //     참여시 예상금액:
    //     {productData &&
    //       (productData?.price / (productData?.curNum + 1)).toLocaleString()}
    //     원
    //   </p>
    //   <p className="truncate text-sm text-[#475569] mb-4">
    //     판매 제품 링크 : {productData?.productsLink}
    //   </p>
    // </div>
  );
};

export default PostMeta;
