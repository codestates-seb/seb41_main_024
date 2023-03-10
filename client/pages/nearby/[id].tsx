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

import Share from '../../components/organisms/share/Share';

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

  // ????????????
  const handleDelete = () => {
    deleteProductDetail(id)
      .then((res) => {
        setDeleteSnackbarOpen(true);
        setDeleteAlertOption({
          severity: 'success',
          value: '???????????? ?????????????????????',
        });

        setTimeout(() => {
          router.push('/');
        }, 1500);
      })
      .catch((error) => {
        setAlertOption({ severity: 'warning', value: '????????? ?????????????????????' });
      });
  };
  // ?????????
  const handleLike = () => {
    if (!isLogin) {
      setIsLoginAlertOpen(true);
    } else {
      setIsLiked(!isLiked);
      likeProduct(id);
    }
  };
  // ????????????
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
  // ????????????
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
            value: '???????????? ????????? ????????? ??? ????????????.',
          });
          setTimeout(() => {
            router.push('/nearby');
          }, 1000);
        });
    }
  };

  // ?????? ????????????
  const handleComplete = () => {
    setIsOpen(false);
    completeSharing(id).then((res) => {
      setIsCompleteModalOpen(false);
      router.push(`/nearby/${id}`);
    });
  };
  // ??????????????? ?????? ??????
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
        <title>?????? ?????? ?????????</title>
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
                alt="?????? ?????????"
                src={productData?.imageLink || '/imageBox/base-box.svg'}
                quality={15}
                fill
                sizes="(max-width: 672px) 40vw, 60vw"
              />
              {isCompletedBoard && (
                <StateBadge stateText={'?????? ??????'} usedDetail={true} />
              )}
              {isReported && (
                <StateBadge stateText={'?????? ??????'} usedDetail={true} />
              )}
              {isFullMemberBorad && (
                <StateBadge stateText={'?????? ??????'} usedDetail={true} />
              )}
              {isExpiredBorad && (
                <StateBadge stateText={'?????? ??????'} usedDetail={true} />
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
          <Share />
          <Divider variant="middle" sx={{ my: 4 }} />
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
          {'N?????? ????????? ????????? ???????????????'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ????????? ??? ??????????????????????
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            ??????
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
        ???????????? ??????
        <br />
        ??????????????????
      </p>
    </div>
  );
};
