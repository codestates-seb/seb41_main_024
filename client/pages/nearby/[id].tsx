import React from 'react';
import Img from '../../components/atoms/image/Image';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProductDetail } from '../../api/detail';

export async function getServerSideProps(context: { params: { id: number } }) {
  const { id } = context.params;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/boards/${id}`
  );

  return {
    props: {
      productData: data,
    },
  };
}

export default function ProductDetail(productData: any) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(['productDetail'], () => getProductDetail(id), {
    initialData: productData,
  });

  return (
    <div>
      <Img src="/chatItem/productImg05.svg" alt="메인사진" />
      <UserMetaInfo productData={data.productData} />
      <PostMeta productData={data.productData} />
      <DetailPageTab productData={data.productData} />
      <DetailBottom />
    </div>
  );
}
