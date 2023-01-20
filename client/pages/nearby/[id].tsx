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
import { getIsWriter } from '../../api/isWriter';
import Cookies from 'js-cookie';

export async function getServerSideProps(context) {
  const { id } = context.params;
  // const { data } = await axios.get(`https://ngether.site/api/boards/${id}`, {
  //   headers: {
  //     Authorization: Cookies.get('access_token'),
  //     Refresh: Cookies.get('refresh_token'),
  //   },
  // });
  // const { isWriter } = await getIsWriter(id);

  return {
    props: {
      id,
    },
  };
}

export default function ProductDetail({ id }) {
  const router = useRouter();

  const { data } = useQuery(['productDetail'], () => getProductDetail(id));

  const productData = data?.data;

  console.log(productData);

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
        productData={productData}
        deleteHandler={deleteHandler}
        id={id}
      />
      <PostMeta productData={productData} />
      <DetailPageTab productData={productData} />
      <DetailBottom />
    </div>
  );
}
