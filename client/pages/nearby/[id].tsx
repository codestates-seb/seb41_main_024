import React, { useEffect } from 'react';
import Img from '../../components/atoms/image/Image';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import {
  deleteProductDetail,
  getProductDetail,
  likeProduct,
  reportProduct,
  getMyFavorite,
  goChatroom,
  completeSharing,
} from '../../api/detail';
import { getIsWriter } from '../../api/isWriter';
import { useState } from 'react';
import Cookies from 'js-cookie';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
}

export default function ProductDetail({ id }: any) {
  const loginChecker = () => {
    if (Cookies.get('access_token')) {
      return true;
    }
    return false;
  };

  const isLogin = loginChecker();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [isReported, setIsReported] = useState<boolean>();
  const [productData, setProductData] = useState<any>();
  const router = useRouter();

  console.log(isLiked);
  const res = useQueries({
    queries: [
      {
        queryKey: ['productDetail'],
        queryFn: () => getProductDetail(id),
        onSuccess: (res: any) => {
          console.log(res);
          setProductData(res.data);

          const openStatus =
            res?.data?.boardStatus === 'BOARD_COMPLETE' ? false : true;
          setIsOpen(openStatus);

          const reportStatus =
            res?.data?.boardStatus === 'BOARD_NOT_DELETE' ? true : false;
          console.log();
          setIsReported(reportStatus);
        },
        retry: false,
      },
      {
        queryKey: ['isWriter'],
        queryFn: () => getIsWriter(id),
      },
    ],
  });

  const isWriter = res[1].data?.data;

  useEffect(() => {
    if (isLogin) {
      getMyFavorite().then((res) => {
        const isMyFavorite: any =
          res.data.data.filter((item: any) => item.boardId === Number(id))
            .length > 0;

        setIsLiked(isMyFavorite);
      });
    }
  }, []);

  const reportForm = {
    reportedId: id,
    reportType: 'board',
  };

  const reportMutation = useMutation(() => reportProduct(reportForm));
  const deleteMutation = useMutation(() => deleteProductDetail(id));
  const likeMutation = useMutation(() => likeProduct(id));

  // 삭제하기
  const handleDelete = () => {
    deleteMutation.mutate();
    router.push('/');
  };

  // 찜하기
  const handleLike = () => {
    if (!isLogin) {
      alert('로그인 후 이용해주세요!');
      router.push('/login');
    } else {
      setIsLiked(!isLiked);
      likeMutation.mutate();
    }
  };

  // 신고하기
  const handleReport = () => {
    if (!isLogin) {
      alert('로그인 후 이용해주세요!');
      router.push('/login');
    } else {
      reportMutation.mutate();
      alert('신고가 접수되었습니다');
    }
  };

  // 참여하기
  const handleGether = () => {
    if (!isLogin) {
      alert('로그인 후 이용해주세요!');
      router.push('/login');
    } else {
      goChatroom(id).then((res) => router.push(`/chatroom/${id}`));
    }
  };

  // 모집 완료하기
  const handleComplete = () => {
    setIsOpen(false);
    completeSharing(id).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      {isReported && <div>신고된 게시물입니다</div>}
      {!isReported && (
        <div>
          <div className="p-10">
            <Img src="/chatItem/productImg05.svg" alt="메인사진" />
          </div>
          <UserMetaInfo
            productData={productData}
            handleDelete={handleDelete}
            isWriter={isWriter}
            id={id}
          />
          <DetailBottom
            isOpen={isOpen}
            isLiked={isLiked}
            isWriter={isWriter}
            handleLike={handleLike}
            handleReport={handleReport}
            handleGether={handleGether}
            handleComplete={handleComplete}
          />
          <PostMeta productData={productData} />
          <DetailPageTab productData={productData} />
        </div>
      )}
    </div>
  );
}
