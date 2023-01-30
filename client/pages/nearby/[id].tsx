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
import CircleLoading from '../../components/organisms/circleLoading/CircleLoading';
import Image from 'next/image';
// import base from '../../public/imageBox/base-box.svg';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

import StateBadge from '../../components/organisms/stateBadge/StateBadge';
import { getMySharing } from '../../api/mySharing';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const { data } = await getProductDetail(id);

  return {
    props: {
      id,
      detailData: data,
    },
  };
}

interface productDetailType {
  id: string;
  datailData: any;
}

export default function ProductDetail({ id, datailData }: productDetailType) {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const handleClose = () => {
    setIsLoginAlertOpen(false);
    router.push('/login');
  };

  const [isLogin, setIsLogin] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isWriter, setIsWriter] = useState<any>();
  const [isMySharing, setIsMySharing] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const { data } = useQuery(['productData'], () => getProductDetail(id), {
    initialData: datailData,
  });

  const productData = data?.data;

  const isOpenBoard =
    productData?.boardStatus &&
    productData?.boardStatus !== 'BOARD_COMPLETE' &&
    productData?.boardStatus !== 'BOARD_NOT_DELETE' &&
    productData?.boardStatus !== 'BOARD_TERM_EXPIRE' &&
    productData?.boardStatus !== 'FULL_MEMBER';

  const isCompletedBoard =
    productData?.boardStatus && productData?.boardStatus === 'BOARD_COMPLETE';
  const isReportedBoard =
    productData?.boardStatus && productData?.boardStatus === 'BOARD_NOT_DELETE';
  const isExpiredBorad =
    productData?.boardStatus &&
    productData?.boardStatus === 'BOARD_TERM_EXPIRE';
  const isFullMemberBorad =
    productData?.boardStatus && productData?.boardStatus === 'FULL_MEMBER';
  const [isOpen, setIsOpen] = useState<boolean>(isOpenBoard);
  const [isReported, setIsReported] = useState<boolean>(isReportedBoard);

  useEffect(() => {
    setIsOpen(isOpenBoard);
    setIsReported(isReportedBoard);

    getIsWriter(id).then((res) => {
      setIsWriter(res.data);
    });

    if (Cookies.get('access_token')) {
      setIsLogin(true);
    }

    if (isLogin) {
      getMyFavorite().then((res) => {
        const isMyFavorite: any =
          res.data.data.filter((item: any) => item.boardId === Number(id))
            .length > 0;
        setIsLiked(isMyFavorite);
      });

      getMySharing().then((res) => {
        const isMine: any =
          res.data.data.filter((item: any) => item.roomId === Number(id))
            .length > 0;

        setIsMySharing(isMine);
      });

      if (productData) {
        setIsLoading(false);
      }
    }
  }, [isLogin, isReportedBoard, isOpenBoard]);

  const reportForm = {
    reportedId: id,
    reportType: 'board',
  };

  // 삭제하기
  const handleDelete = () => {
    deleteProductDetail(id).then((res) => router.push('/'));
  };
  // 찜하기
  const handleLike = () => {
    if (!isLogin) {
      setIsLoginAlertOpen(true);
    } else {
      setIsLiked(!isLiked);
      likeProduct(id);
    }
  };
  // 신고하기
  const handleReport = () => {
    if (!isLogin) {
      setIsLoginAlertOpen(true);
    } else {
      setIsReported(true);
      setIsOpen(false);
      reportProduct(reportForm).then((res) => {
        setIsReportModalOpen(false);
      });
    }
  };
  // 참여하기
  const handleGether = () => {
    if (!isLogin) {
      setIsLoginAlertOpen(true);
    } else {
      goChatroom(id).then((res) => router.push(`/chatroom/${id}`));
    }
  };
  // 모집 완료하기
  const handleComplete = () => {
    setIsOpen(false);
    completeSharing(id).then((res) => {});
  };
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const handleReportModalOpen = () => setIsReportModalOpen(true);
  const handleReportModalClose = () => setIsReportModalOpen(false);
  const [isGetherModalOpen, setGetherModalOpen] = useState(false);
  const handleGetherModalOpen = () => setGetherModalOpen(true);
  const handleGetherModalClose = () => setGetherModalOpen(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const handleIsCompleteModalOpen = () => setIsCompleteModalOpen(true);
  const handleIsCompleteModalClose = () => setIsCompleteModalOpen(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleIsDeleteModalOpen = () => setIsDeleteModalOpen(true);
  const handleIsDeleteModalClose = () => setIsDeleteModalOpen(false);
  const handleGoEdit = (id: any) => {
    router.push(`/edit/${id}`);
  };

  if (productData?.imageLink === '') {
    productData.imageLink = '/imageBox/base-box.svg';
  }

  return (
    <div>
      {isLoading && <CircleLoading />}
      {!isLoading && productData && (
        <div>
          <div className="relative pb-[70%]">
            <div className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-[59%] pb-[59%]">
              <Image
                className="p-8"
                src={productData?.imageLink || '/imageBox/base-box.svg'}
                alt={'상품 이미지'}
                fill
              />
              {isCompletedBoard && (
                <StateBadge stateText={'모집 확정'} usedDetail={true} />
              )}
              {isReported && (
                <StateBadge stateText={'신고 완료'} usedDetail={true} />
              )}
              {isFullMemberBorad && (
                <StateBadge stateText={'참여 불가'} usedDetail={true} />
              )}
              {isExpiredBorad && (
                <StateBadge stateText={'기간 만료'} usedDetail={true} />
              )}
            </div>
          </div>

          <DetailBottom
            isOpen={isOpen}
            isReported={isReported}
            isLiked={isLiked}
            isWriter={isWriter}
            isMySharing={isMySharing}
            handleLike={handleLike}
            handleReport={handleReport}
            handleGether={handleGether}
            handleComplete={handleComplete}
            isReportModalOpen={isReportModalOpen}
            handleReportModalOpen={handleReportModalOpen}
            handleReportModalClose={handleReportModalClose}
            isGetherModalOpen={isGetherModalOpen}
            handleGetherModalOpen={handleGetherModalOpen}
            handleGetherModalClose={handleGetherModalClose}
            isCompleteModalOpen={isCompleteModalOpen}
            handleIsCompleteModalOpen={handleIsCompleteModalOpen}
            handleIsCompleteModalClose={handleIsCompleteModalClose}
            isAdmin={false}
            handleUserBlock={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <UserMetaInfo
            isOpen={isOpen}
            productData={productData}
            handleDelete={handleDelete}
            isWriter={isWriter}
            id={id}
            handleComplete={handleComplete}
            handleGoEdit={handleGoEdit}
            isDeleteModalOpen={isDeleteModalOpen}
            handleIsDeleteModalOpen={handleIsDeleteModalOpen}
            handleIsDeleteModalClose={handleIsDeleteModalClose}
            isCompleteModalOpen={isCompleteModalOpen}
            handleIsCompleteModalOpen={handleIsCompleteModalOpen}
            handleIsCompleteModalClose={handleIsCompleteModalClose}
          />
          <Divider variant="middle" sx={{ my: 1 }} />
          <PostMeta
            productData={productData}
            isLiked={isLiked}
            handleLike={handleLike}
          />
          <DetailPageTab productData={productData} />
          <LoginAlert
            isLoginAlertOpen={isLoginAlertOpen}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
interface LoginAlertPropsType {
  isLoginAlertOpen: boolean;
  handleClose: () => void;
}
const LoginAlert = ({ isLoginAlertOpen, handleClose }: LoginAlertPropsType) => {
  return (
    <div>
      <Dialog
        open={isLoginAlertOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle color="primary" id="alert-dialog-title">
          {'N게더 회원만 가능한 기능입니다'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            로그인 후 이용해주세요😀
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
