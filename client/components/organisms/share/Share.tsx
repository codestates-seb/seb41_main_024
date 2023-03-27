import React, { useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useRouter } from 'next/router';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useScript } from '../../../hooks/useScript';
import { useEffect } from 'react';

import kakaoShare from '../../../public/share/kakaoShare.png';

import Image from 'next/image';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Share = () => {
  const router = useRouter();
  const currentUrl = `https://ngether.xyz${router.asPath}`;

  console.log(router);

  const [open, setOpen] = useState(false);
  // const [alertOption, setAlertOption] = useState<{
  //   severity: AlertColor;
  //   value: string;
  // }>({ severity: 'success', value: 'URL이 복사되었습니다' });

  // kakao SDK import하기
  const status = useScript('https://developers.kakao.com/sdk/js/kakao.js');

  // kakao sdk 초기화하기
  // status가 변경될 때마다 실행되며, status가 ready일 때 초기화를 시도합니다.
  useEffect(() => {
    if (status === 'ready' && window.Kakao) {
      // 중복 initialization 방지
      if (!window.Kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        window.Kakao.init('04eb0f14a2f2f7b5f7352ad054a8512f');
      }
    }
  }, [status]);

  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };

  const handleCopyAlert = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ my: 0, mx: 0 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-center"
          spacing={2}
        >
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon
              size={48}
              round={true}
              borderRadius={24}
            ></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
          </TwitterShareButton>
          <CopyToClipboard text={currentUrl}>
            <button
              onClick={handleCopyAlert}
              className="flex justify-center items-center w-12 h-12 rounded-full text-lg text-white bg-[#f48b3a] hover:bg-[#adaba9]"
            >
              URL
            </button>
          </CopyToClipboard>
          <a onClick={handleKakaoButton} className="cursor-pointer">
            <Image
              alt="kakao"
              src={kakaoShare}
              className="w-12 h-12 bg-[#200d04] rounded-full"
            ></Image>
          </a>
          <LineShareButton url={currentUrl}>
            <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
          </LineShareButton>
        </Stack>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          className="bottom-[25%]"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success">URL이 복사되었습니다!</Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Share;
