import Input from '../../components/atoms/input/Input';
import Label from '../../components/atoms/label/Label';
import Stack from '@mui/material/Stack';
import base from '../../public/imageBox/base-box.svg';

import FormControl from '@mui/material/FormControl';

import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { getProductDetail } from '../../api/detail';
import { editProductDetail } from '../../api/detail';
import Cookies from 'js-cookie';

import FormButton from '../../components/molecules/formbutton/FormButton';
import useInput from '../../hooks/addNewHooks/useInput';
import { Alert, AlertColor, Box, Snackbar } from '@mui/material';

import { exchangeCoordToAddress, searchMap } from '../../api/kakaoMap';
import { getCurrentLocation } from '../../api/location';
import * as cheerio from 'cheerio';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import DropdownInput from '../../components/molecules/dropdownInput/DropdownInput';
import { validatePostInput } from '../../utils/uploadPost/postInputValidation';
import { getIsWriter } from '../../api/isWriter';
import Head from 'next/head';

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const { data } = await getProductDetail(id);

  return {
    props: {
      previousData: data,
      id,
    },
  };
}

interface previousDataProps {
  previousData: {
    title: string;
    price: number;
    productsLink: string;
    category: string;
    address: string;
    content: string;
    createDate: string;
    maxNum: number;
    curNum: number;
    deadLine: string;
    nickname: string;
    imageLink: string;
    latitude: string;
    longitude: string;
  };
  id: string;
}

const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];

const EditPage = ({ previousData, id }: previousDataProps) => {
  const router = useRouter();

  const [productImg, setProductImg] = useState(previousData.imageLink);
  const [targetCoord, setTargetCoord] = useState<any>({
    lat: previousData.latitude,
    lng: previousData.longitude,
    address: previousData.address,
  });

  const [isSearch, setIsSearch] = useState(false);
  const [center, setCenter] = useState<any>({
    lat: previousData.latitude,
    lng: previousData.longitude,
    address: previousData.address,
  });
  const [locationError, setLocationError] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [open, setOpen] = useState(false);

  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: 'error', value: '' });

  const { isLoading, error, mutate } = useMutation(
    () => editProductDetail(id, requestBody),
    {
      onSuccess: async (data) => {
        setOpen(true);
        setAlertOption({
          severity: 'success',
          value: '게시글이 수정되었습니다',
        });
        router.push(`/nearby/${id}`);
      },

      onError: (error) => {
        setOpen(true);
        setAlertOption({
          severity: 'error',
          value: '게시물 수정에 실패했습니다. 잠시 후 다시 시도해주세요',
        });
      },
    }
  );

  const [imageLink, setImageLink] = useState<string | undefined>(
    previousData.imageLink
  );
  const { inputValue, onChange } = useInput({
    title: previousData.title,
    price: previousData.price,
    productsLink: previousData.productsLink,
    category: previousData.category,
    maxNum: previousData.maxNum,
    content: previousData.content,
    deadLine: previousData.deadLine,
  });

  useEffect(() => {
    getIsWriter(id).then((res) => {
      if (!res.data) {
        router.push('/login');
      }
    });
  }, []);

  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center.lat, center.lng, isSearch]);

  const { title, price, productsLink, category, maxNum, content, deadLine } =
    inputValue;

  const handleSearchAddress = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchAddress(e.target.value);
  };

  let categoryValue = category === '상품 쉐어링' ? 'product' : 'delivery';
  const requestBody: any = {
    ...inputValue,
    category: categoryValue,
    latitude: targetCoord.lat,
    longitude: targetCoord.lng,
    address: targetCoord.address,
    imageLink,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    mutate();
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
    if (
      e.target.value.includes('www.coupang.com') ||
      !e.target.value.includes('https')
    )
      return;
    return axios({
      method: 'get',
      url: e.target.value,
    }).then(({ data, status }) => {
      if (status !== 200) {
        alert('이미지 정보를 불러오는데 실패했습니다.');
      }
      const $ = cheerio.load(data);
      $('meta').each((_, el) => {
        const key = $(el).attr('property')?.split(':')[1];
        if (key) {
          const value = $(el).attr('content');
          const checkUrl = value?.includes('https');
          if (key === 'image' && checkUrl) {
            if (value && value.length >= 2000) {
              return;
            }
            setImageLink(value);
          }
        }
      });
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Head>
        <title>게시글 수정</title>
        <meta
          name="description"
          content="내가 게시한 Ngether 모집글을 수정할 수 있는 페이지입니다"
        />
      </Head>
      <div className="flex justify-center m-7 my-12 ani_fadeIn">
        <FormControl fullWidth className="flex flex-col w-10/12 max-w-lg">
          <Stack spacing={4}>
            <div id="map" className="w-[100%] h-[350px]"></div>
            <p>
              <em>상품을 나눌 위치를 지도에서 클릭해주세요</em>
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
                onClick={() => searchMap(searchAddress, setCenter)}
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
            <Label htmlFor={'title'} labelText={''} />
            <Input
              variant="outlined"
              id="title"
              name="title"
              type="text"
              label="상품명"
              value={title}
              onChange={onChange}
            />
            <Label htmlFor={'price'} labelText={''} />
            <Input
              variant="outlined"
              id="price"
              name="price"
              type="number"
              label="가격"
              placeholder="총모집인원 x 상품가격"
              value={price}
              inputProps={{ min: 0 }}
              onChange={onChange}
              helperText="배송비를 포함한 가격을 입력해주세요"
            />
            <div className="flex items-center">
              <img
                className="h-40 w-40 mb-7 m-auto"
                src={imageLink || productImg}
                alt={'상품이미지'}
              />
              <span className="mx-2">
                상품 링크를 입력하면
                <br /> 자동으로 상품이미지가 등록됩니다
              </span>
            </div>
            <Label htmlFor={'productsLink'} labelText={''} />
            <Input
              variant="outlined"
              id="productsLink"
              name="productsLink"
              type="text"
              label="상품 링크"
              value={productsLink}
              onChange={onChange}
              onBlur={getLinkMetaData}
              helperText="쿠팡 상품은 이미지 자동 업로드 지원이 되지 않습니다."
            />

            <FormControl fullWidth>
              <DropdownInput
                dropDownOptions={CATEGORY_OPTIONS}
                id="category"
                name="category"
                label="카테고리"
                onChange={onChange}
                defaultValue="상품 쉐어링"
                value={category}
              />
            </FormControl>
            <FormControl fullWidth>
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
            </FormControl>

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
              content="쉐어링 수정"
              type="submit"
            />
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
  );
};

export default EditPage;
