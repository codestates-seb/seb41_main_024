import React, { useEffect } from 'react';
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
  reportProduct,
  getMyFavorite,
  goChatroom,
} from '../../api/detail';
import { getIsWriter } from '../../api/isWriter';
import Cookies from 'js-cookie';
import { useState } from 'react';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const { data } = await getProductDetail(id);
  return {
    props: {
      id,
    },
  };
}

export default function ProductDetail({ id }: any) {
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
      {
        queryKey: ['MyFavorites'],
        queryFn: getMyFavorite,
      },
    ],
  });

  const productData = res[0].data?.data;
  const isWriter = res[1].data?.data;
  const isMyFavorite =
    res[2].data?.data?.data.filter((item: any) => item.boardId === Number(id))
      .length > 0;

  const reportForm = {
    reportedId: id,
    reportType: 'board',
  };
  const reportutation = useMutation(() => reportProduct(reportForm));

  const [isLiked, setIsLiked] = useState(isMyFavorite);

  const deleteMutation = useMutation(() => deleteProductDetail(id));
  const likeMutation = useMutation(() => likeProduct(id));

  const handleDelete = () => {
    deleteMutation.mutate();
    router.push('/');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeMutation.mutate();
  };

  const handleReport = () => {
    reportutation.mutate();
  };

  const handleGether = () => {
    goChatroom(id).then((res) => router.push(`/chatroom/${id}`));
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
      <DetailBottom
        isLiked={isLiked}
        isWriter={isWriter}
        handleLike={handleLike}
        handleReport={handleReport}
        handleGether={handleGether}
        id={id}
      />
      <PostMeta productData={productData} />
      <DetailPageTab productData={productData} />
    </div>
  );
}
