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
import Cookies from 'js-cookie';

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const { data } = await getProductDetail(id);

  return {
    props: {
      productData: data,
    },
  };
}

export default function ProductDetail(productData: any) {
  const router = useRouter();

  console.log('productData >>>', productData);

  return (
    <div>
      <Img src="/chatItem/productImg05.svg" alt="메인사진" />
      <UserMetaInfo productData={productData.productData} />
      <PostMeta productData={productData.productData} />
      <DetailPageTab productData={productData.productData} />
      <DetailBottom />
    </div>
  );
}
