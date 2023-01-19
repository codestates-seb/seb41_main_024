import React from 'react';
import Img from '../../components/atoms/image/Image';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export async function getServerSideProps(context: { params: { id: number } }) {
  const { id } = context.params;
  // const { data } = await axios.get(`http://3.34.54.131:8080/api/boards/${id}`);
  const { data } = await axios.get(`http://localhost:3001/productList/${id}`);

  return {
    props: {
      productData: data,
    },
  };
}

export default function ProductDetail(productData: any) {
  const router = useRouter();
  const { id } = router.query;

  function getProductDetail() {
    return axios.get(`http://localhost:3001/productList/${id}`, {
      // return axios.get(`http://3.34.54.131:8080/api/boards/${id}`, {
      headers: {
        Authorization: Cookies.get('access_token'),
        Refresh: Cookies.get('refresh_token'),
      },
    });
  }

  const { data } = useQuery(['productDetail'], getProductDetail, {
    initialData: productData,
  });

  console.log(data);
  return (
    <div>
      <Img src="/detail/straw.svg" alt="메인사진" />
      <UserMetaInfo productData={data.productData} />
      <PostMeta productData={data.productData} />
      <DetailPageTab productData={data.productData} />
      <DetailBottom />

      {/* <div>
        <Img src="/detail/straw.svg" alt="메인사진" />
        <UserMetaInfo userData={USER_DATA} />
        <PostMeta postData={POST_DETAIL_DATA} />
        <DetailPageTab content={POST_DETAIL_DATA.content} />
        <DetailBottom />
      </div> */}
    </div>
  );
}

// const POST_DETAIL_DATA = {
//   content:
//     '빨대가 필요한데 양이 너무 많아요 ㅠㅠ 500개짜리 사서 100개씩 나누실 5분 구합니다 위치는 일단 저희집 근처로 지정했는데 조정 가능해요! 편하게 말씀해주세요^^',
//   title: '코멧 개별포장 일자빨대 블랙 500개',
//   category: '대량주문',
//   createDate: new Date('Sat Jan 14 2023 00:00:53 GMT+0900 (GMT+09:00)'),
//   price: 22000,
//   maxNum: 4,
//   curNum: 1,
//   deadLine: '2023-01-20',
//   productsLink:
//     'https://www.figma.com/file/c5ndHFggdYDwI79WPIBJQp/Ngether?node-id=51%3A2548&t=FrQ9Bo12zF84j9B4-0',
// };
// const USER_DATA = {
//   nickname: '팔라당150',
//   address: '수원시 권선구 권선동',
// };
