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
import DialogButton from '../../components/organisms/DialogButton/DialogButton';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  return {
    props: {
      id,
    },
  };
}

export default function ProductDetail({ id }: any) {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const handleClose = () => {
    setIsLoginAlertOpen(false);
    router.push('/login');
  };

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
      setIsLoginAlertOpen(true);
    } else {
      setIsLiked(!isLiked);
      likeMutation.mutate();
    }
  };

  // 신고하기
  const handleReport = () => {
    if (!isLogin) {
      setIsLoginAlertOpen(true);
    } else {
      reportMutation.mutate();
      alert('신고가 접수되었습니다');
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
