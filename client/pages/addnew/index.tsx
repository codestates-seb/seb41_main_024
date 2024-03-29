import Input from '../../components/atoms/input/Input';
import FormButton from '../../components/molecules/formbutton/FormButton';
import Label from '../../components/atoms/label/Label';
import Stack from '@mui/material/Stack';
import base from '../../public/imageBox/base-box.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { uploadPost } from '../../api/post';
import { useMutation } from '@tanstack/react-query';
import useInput from '../../hooks/addNewHooks/useInput';
import { Alert, AlertColor, Box, Snackbar } from '@mui/material';
import { uploadPostType } from '../../hooks/addNewHooks/useInputType';

import { exchangeCoordToAddress, searchMap } from '../../api/kakaoMap';
import { getCurrentLocation } from '../../api/location';
import * as cheerio from 'cheerio';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  ReactElement,
  ReactEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import LoginChecker from '../../components/container/loginChecker/LoginChecker';
import axios from 'axios';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import { validatePostInput } from '../../utils/uploadPost/postInputValidation';
import Cookies from 'js-cookie';
import CircleLoading from '../../components/organisms/circleLoading/CircleLoading';
import Head from 'next/head';
const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];
const AddNewPage = () => {
  const [token, setToken] = useState({ Authorization: '', Refresh: '' });
  const router = useRouter();

  const [productImg, setProductImg] = useState(base);
  const [targetCoord, setTargetCoord] = useState({
    lat: 37.517331925853,
    lng: 127.047377408384,
    address: '서울 강남구',
  });
  const [isSearch, setIsSearch] = useState(false);
  const [center, setCenter] = useState({
    lat: 37.517331925853,
    lng: 127.047377408384,
    address: '서울 강남구',
  });

  const [locationError, setLocationError] = useState({ code: 0, message: '' });

  const [searchAddress, setSearchAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: 'warning', value: '' });

  const { isLoading, error, mutate } = useMutation(uploadPost, {
    onSuccess: async (data) => {
      setOpen(true);
      setAlertOption({ severity: 'success', value: '게시글이 등록되었습니다' });
      await axios({
        url: `https://ngether.site/chat/room/${data.data.boardId}`,
        method: 'get',
        headers: token,
      });
      await axios({
        url: `https://ngether.site/chat/room/enter/${data.data.boardId}`,
        method: 'get',
        headers: token,
      });
      router.push(`/nearby/${data.data.boardId}`);
    },

    onError: (error) => {
      alert('게시물 등록에 실패했습니다. 잠시 후 다시 시도해주세요');
    },
  });
  const [imageLink, setImageLink] = useState<string | undefined>('');
  const { inputValue, onChange } = useInput({
    title: '',
    productsLink: '',
    category: '상품 쉐어링',
    maxNum: 2,
    content: '',
    deadLine: '',
  });
  interface requestType {
    title?: string;
    price?: number;
    productsLink: string;
    category: string;
    maxNum: number;
    content: string;
    deadLine: string;
    searchOption: string;
    latitude: any;
    longitude: any;
    accessToken: string;
    refreshToken: string;
    address: string;
  }
  useEffect(() => {
    setToken({
      Authorization: Cookies.get('access_token') || '',
      Refresh: Cookies.get('refresh_token') || '',
    });
    getCurrentLocation(setCenter, setLocationError);
    setIsSearch((prev) => !prev);
  }, []);

  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center.lat, center.lng, isSearch, token.Authorization]);
  const { title, price, productsLink, category, maxNum, content, deadLine } =
    inputValue;
  const handleSearchAddress = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addressInfo = targetCoord?.address?.split(' ');
    if (addressInfo?.length <= 1)
      return alert('주소는 시,구 까지 입력되어야 합니다. 지도를 클릭해주세요');
    let categoryValue = category === '상품 쉐어링' ? 'product' : 'delivery';
    const requestBody: any = {
      ...inputValue,
      category: categoryValue,
      latitude: targetCoord.lat,
      longitude: targetCoord.lng,
      address: targetCoord.address,
      accessToken: token.Authorization,
      refreshToken: token.Refresh,
      imageLink,
    };
    const validation = validatePostInput({
      title,
      address: targetCoord?.address,
      productsLink: encodeURIComponent(productsLink),
      maxNum,
      deadLine,
      content,
      setOpen,
      setAlertOption,
    });
    if (!validation) return;

    mutate(requestBody);
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

  const getLinkMetaData = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.includes('www.coupang.com')) {
      console.log('hi');

      setOpen(true);
      return setAlertOption({
        severity: 'warning',
        value: '쿠팡은 이미지 업로드 지원이 되지 않습니다.',
      });
    }
    if (!e.target.value.includes('https')) {
      setOpen(true);
      return setAlertOption({
        severity: 'warning',
        value: 'http 사이트는 이미지 업로드 지원이 되지 않습니다',
      });
    }

    /* const data = await axios({
      method: 'post',
      url: '/api/getLinkMetaInfo',
      data: { url: e.target.value },
    });
    console.log(data); */
    try {
      return axios({
        method: 'get',
        url: e.target.value,
      }).then(({ data, status }) => {
        if (status !== 200) {
          setOpen(true);
          setAlertOption({
            severity: 'warning',
            value: '이미지 업로드에 실패했습니다.',
          });
        }

        const $ = cheerio.load(data);
        $('meta').each((_, el) => {
          const key = $(el).attr('property')?.split(':')[1]; // ? 옵셔널 체이닝 앞에가 있으면 실행
          if (key) {
            const value = $(el).attr('content');
            const checkUrl = value?.includes('https');
            if (key === 'image' && checkUrl) {
              if (value && value.length >= 2000) {
                setOpen(true);
                return setAlertOption({
                  severity: 'warning',
                  value: '이미지 업로드에 실패했습니다.',
                });
              }
              setImageLink(value);
              setOpen(true);
              setAlertOption({
                severity: 'success',
                value: '이미지가 업로드되었습니다',
              });
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
      setOpen(true);
      setAlertOption({
        severity: 'warning',
        value: '이미지 업로드에 실패했습니다.',
      });
    }
  };

  return (
    <LoginChecker path="/addnew">
      <Head>
        <title>Ngether 모집</title>
        <meta
          name="description"
          content="Negther를 모집하는 글을 등록할 수 있습니다. 우리 동네 근처에 모집글을 올려 이웃들과 함께 대량의 물품을 구매해서 나눠보세요"
        />
      </Head>
      <Box component="form" onSubmit={handleSubmit}>
        <div className="flex justify-center m-7 my-12 screen-maxw672:mx-0">
          <FormControl
            fullWidth
            className="flex flex-col w-10/12 max-w-lg screen-maxw672:max-w-full screen-maxw672:px-4 screen-maxw672:w-full"
          >
            <Stack spacing={4}>
              <div id="map" className="w-[100%] h-[350px] fadeIn"></div>
              <p>
                <em>상품을 나눌 위치를 지도에서 클릭해주세요</em>
                {locationError?.message && (
                  <em className="text-[red] block">
                    위치 권한 허용을 하지 않으신 경우 아래에서 주소 검색을
                    해주세요
                  </em>
                )}
              </p>
              <div className="flex width-[100%]">
                <Input
                  id="location"
                  name="location"
                  type="text"
                  label="도로명주소 검색"
                  onKeyDown={(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      setIsSearch((prev) => !prev);
                      e.preventDefault();
                      return searchMap(searchAddress, setCenter);
                    }
                  }}
                  onChange={handleSearchAddress}
                />
                <FormButton
                  variant="contained"
                  className="bg-[#63A8DA] text-[white] ml-[10px]"
                  content="검색"
                  onClick={() => {
                    setIsSearch((prev) => !prev);
                    searchMap(searchAddress, setCenter);
                  }}
                ></FormButton>
              </div>
              <Input
                id="address"
                name="address"
                type="text"
                label="쉐어링 위치"
                value={targetCoord.address || center.address}
                disabled
              />
              <div className="flex items-center screen-maxw672:flex-col">
                <img
                  className="h-40 w-40 mb-7 m-auto"
                  src={imageLink || productImg}
                  alt={'상품이미지'}
                />
                <span className="text-center break-keep">
                  상품 링크를 입력하면 자동으로 상품이미지가 등록됩니다
                </span>
              </div>
              <Label htmlFor={'productsLink'} labelText={''} />
              <Input
                variant="outlined"
                id="productsLink"
                name="productsLink"
                type="text"
                autoComplete="off"
                label="공동구매 상품 링크"
                value={productsLink}
                onChange={onChange}
                onBlur={getLinkMetaData}
                helperText="11번가, 이마트, 홈플러스 사이트에서 이미지 자동업로드가 지원됩니다."
              />
              <Label htmlFor={'title'} labelText={''} />
              <Input
                variant="outlined"
                id="title"
                name="title"
                type="text"
                label="게시글 제목(상품 링크를 먼저 입력해주세요)"
                value={title}
                onChange={onChange}
                {...(!productsLink && { disabled: true })}
              />
              <Label htmlFor={'price'} labelText={''} />
              <Input
                variant="outlined"
                id="price"
                name="price"
                type="number"
                label="상품 가격(상품 링크를 먼저 입력해주세요)"
                placeholder="총모집인원 x 상품가격"
                value={price}
                inputProps={{ min: 0 }}
                onChange={onChange}
                helperText="배송비를 포함한 가격을 입력해주세요"
                {...(!productsLink && { disabled: true })}
              />

              <DropdownInput
                dropDownOptions={CATEGORY_OPTIONS}
                id="category"
                name="category"
                label="카테고리"
                onChange={onChange}
                defaultValue="상품 쉐어링"
                value={category}
              />

              <Input
                variant="outlined"
                id="maxNum"
                name="maxNum"
                value={maxNum}
                label="모집 인원"
                inputProps={{ min: 0 }}
                type="number"
                onChange={onChange}
              ></Input>

              <Input
                variant="outlined"
                id="deadLine"
                name="deadLine"
                type="date"
                label="모집기간"
                onChange={onChange}
                value={deadLine}
                InputLabelProps={{ shrink: true }}
              />
              <Label htmlFor={'address'} labelText={''} />
              <Input
                variant="outlined"
                id="content"
                name="content"
                label="내용"
                placeholder="ex) 배송비 : 000원, 나눔 장소 : 00공원 "
                value={content}
                onChange={onChange}
                rows={10}
                multiline
                className="h-15.75"
              ></Input>

              <FormButton
                className="h-14 mt-4"
                variant="contained"
                content="쉐어링 등록"
                type="submit"
              />
              <div className="relative">
                {isLoading && (
                  <CircleLoading
                    className="absolute top-[-500px] left-[50%] translate-x-[-50%]"
                    message="쉐어링 등록 중입니다. 잠시만 기다려주세요"
                  />
                )}
              </div>
            </Stack>
          </FormControl>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            className="bottom-[25%]"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity={alertOption?.severity}>{alertOption?.value}</Alert>
          </Snackbar>
        </div>
      </Box>
    </LoginChecker>
  );
};

export default AddNewPage;
