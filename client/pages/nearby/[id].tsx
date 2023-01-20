import React from 'react';
import Img from '../../components/atoms/image/Image';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { deleteProductDetail, getProductDetail } from '../../api/detail';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

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
  const { id } = router.query;
  const [cookies, setCookie] = useCookies(['memberId']);
  const isWriter =
    Number(cookies.memberId) === productData?.productData?.memberId;
  const { data } = useQuery(['productDetail'], () => getProductDetail(id), {
    initialData: productData,
  });

  function deleteHandler() {
    const deleteMutation = useMutation(() => deleteProductDetail(id));
    deleteMutation.mutate();
    if (deleteMutation.data) {
      router.push('/');
    }
  }

  return (
    <div>
      <Img src="/chatItem/productImg05.svg" alt="메인사진" />
      <UserMetaInfo
        productData={productData.productData}
        isWriter={isWriter}
        deleteHandler={deleteHandler}
        id={id}
      />
      <PostMeta productData={productData.productData} />
      <DetailPageTab productData={productData.productData} />
      <DetailBottom />
    </div>
  );
}
