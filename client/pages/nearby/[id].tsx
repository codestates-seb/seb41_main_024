import React from 'react';
import Img from '../../components/atoms/image/Image';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';
import axios from 'axios';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  deleteProductDetail,
  getProductDetail,
  likeProduct,
} from '../../api/detail';
import { getIsWriter } from '../../api/isWriter';
import Cookies from 'js-cookie';
import { useState } from 'react';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await getProductDetail(id);
  return {
    props: {
      id,
    },
  };
}

export default function ProductDetail({ id }) {
  const router = useRouter();

  const res = useQueries({
    queries: [
      {
        queryKey: ['productDetail'],
        queryFn: () => getProductDetail(id),
      },
      {
        queryKey: ['isWriter'],
        queryFn: () => getIsWriter(id),
      },
    ],
  });

  const productData = res[0].data?.data;
  const isWriter = res[1].data?.data;

  console.log('dfs', productData);
  const deleteMutation = useMutation(() => deleteProductDetail(id));
  const likeMutation = useMutation(() => likeProduct(id));

  const [isLiked, setIsLiked] = useState(false);
  // const [isLiked, setIsLiked] = useState(likeMutation.data.status);

  console.log('likeMutation', likeMutation);

  const handleDelete = () => {
    deleteMutation.mutate();
    router.push('/');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeMutation.mutate();
  };

  return (
    <div>
      <Img src="/chatItem/productImg05.svg" alt="메인사진" />
      <UserMetaInfo
        productData={productData}
        handleDelete={handleDelete}
        isWriter={isWriter}
        id={id}
      />
      <PostMeta productData={productData} />
      <DetailPageTab productData={productData} />
      <DetailBottom isLiked={isLiked} handleLike={handleLike} id={id} />
    </div>
  );
}
