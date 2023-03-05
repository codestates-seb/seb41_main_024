import React, { useEffect } from 'react';
import DetailBottom from '../../components/molecules/detailBottom/DetailBottom';
import PostMeta from '../../components/molecules/postMeta/PostMeta';
import UserMetaInfo from '../../components/molecules/userMetaInfo/UserMetaInfo';
import DetailPageTab from '../../components/organisms/tab/detailPageTab/DetailPageTab';
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

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

import StateBadge from '../../components/organisms/stateBadge/StateBadge';
import { getMySharing } from '../../api/mySharing';
import useAdminRole from '../../hooks/common/useAdminRole';
import { handleBlockUser } from '../../api/admin';
import Head from 'next/head';
import { Alert, AlertColor, Box, Snackbar } from '@mui/material';

import Image from 'next/image';

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  try {
    const res = await getProductDetail(id);

    if (res.status === 200) {
      const productData = res.data;
      return { props: { id, productData } };
    }
    return { props: { id } };
  } catch (error) {
    console.log(error);
    return { props: { id } };
  }
}

interface productDetailType {
  id: string;
  productData: any;
}

export default function ProductDetail({ id, productData }: productDetailType) {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const handleClose = () => {
    setIsLoginAlertOpen(false);
    router.push('/login');
  };

  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [deleteAlertOption, setDeleteAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: 'error', value: '' });

  const [isLogin, setIsLogin] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isWriter, setIsWriter] = useState<any>();
  const [isMySharing, setIsMySharing] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAdmin } = useAdminRole();
  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: 'warning', value: '' });
  const router = useRouter();

  // const productData = data?.data;

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

    if (productData) {
      getIsWriter(id).then((res) => {
        setIsWriter(res.data);
      });
    }

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
    deleteProductDetail(id)
      .then((res) => {
        setDeleteSnackbarOpen(true);
        setDeleteAlertOption({
          severity: 'success',
          value: '게시글이 삭제되었습니다',
        });

        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .catch((error) => {
        setAlertOption({ severity: 'warning', value: '삭제에 실패하였습니다' });
      });
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
      goChatroom(id)
        .then((res) => router.push(`/chatroom/${id}`))
        .catch(() => {
          setDeleteSnackbarOpen(true);
          setGetherModalOpen(false);
          setDeleteAlertOption({
            severity: 'error',
            value: '강퇴당한 유저는 참여할 수 없습니다.',
          });
          setTimeout(() => {
            router.push('/nearby');
          }, 1000);
        });
    }
  };

  // 모집 완료하기
  const handleComplete = () => {
    setIsOpen(false);
    completeSharing(id).then((res) => {
      setIsCompleteModalOpen(false);
      router.push(`/nearby/${id}`);
    });
  };
  // 어드민일시 유저 정지
  const handleBlockUserByNickName = () => {
    const nickName = productData?.nickname;
    handleBlockUser(nickName, Number(localStorage.getItem('reportId')));
    localStorage.removeItem('reportId');
    router.push('/admin');
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

  return (
    <div>
      <Head>
        <title>공유 상세 페이지</title>
      </Head>
      {!productData && <NoPage />}
      {productData && (
        <Box
          sx={{
            mx: 1.5,
          }}
        >
          <div className="relative pb-[70%]">
            <div className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-[59%] pb-[59%]">
              <Image
                alt="제품 이미지"
                src={productData?.imageLink || '/imageBox/base-box.svg'}
                quality={15}
                fill
                sizes="(max-width: 672px) 40vw, 60vw"
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
            isAdmin={isAdmin}
            handleUserBlock={handleBlockUserByNickName}
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
          <Snackbar
            open={deleteSnackbarOpen}
            autoHideDuration={4000}
            onClose={handleClose}
            className="bottom-[25%]"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity={deleteAlertOption?.severity}>
              {deleteAlertOption?.value}
            </Alert>
          </Snackbar>
        </Box>
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

const NoPage = () => {
  return (
    <div className="w-[100%] text-5xl mt-[12rem] leading-normal text-[#999]">
      <p className="text-center">
        존재하지 않는
        <br />
        쉐어링입니다
      </p>
    </div>
  );
};
