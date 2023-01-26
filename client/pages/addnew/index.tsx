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
import { Box } from '@mui/material';
import { uploadPostType } from '../../hooks/addNewHooks/useInputType';
import { Cookies } from 'react-cookie';
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
const CATEGORY_OPTIONS = [
  { label: '상품 쉐어링', value: '상품 쉐어링' },
  { label: '배달음식 쉐어링', value: '배달음식 쉐어링' },
];
const AddNewPage = () => {
  const [token, setToken] = useState({ authorization: '', refresh: '' });
  const router = useRouter();

  const [productImg, setProductImg] = useState(base);
  const [targetCoord, setTargetCoord] = useState({
    lat: 0,
    lng: 0,
    address: '',
  });
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [locationError, setLocationError] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  const { isLoading, error, mutate } = useMutation(uploadPost, {
    onSuccess: async (data) => {
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
      router.push('/');
    },

    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });
  const cookie = new Cookies();
  const [imgSrc, setImgSrc] = useState<string | undefined>('');
  const { inputValue, onChange } = useInput({
    title: '',
    price: 0,
    productsLink: '',
    category: 'product',
    maxNum: '1',
    content: '',
    deadLine: '',
  });
  interface requestType {
    title?: string;
    price?: number;
    productsLink: string;
    category: string;
    maxNum: string;
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
    getCurrentLocation(setCenter, setLocationError);
    const authorization = cookie.get('access_token');
    const refresh = cookie.get('refresh_token');
    authorization || refresh
      ? setToken({ authorization, refresh })
      : router.push('/login');
  }, []);
  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center]);
  const { title, price, productsLink, category, maxNum, content, deadLine } =
    inputValue;
  const handleSearchAddress = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let categoryValue = category === '상품 쉐어링' ? 'product' : 'delivery';
    const requestBody: any = {
      ...inputValue,
      category: categoryValue,
      latitude: targetCoord.lat,
      longitude: targetCoord.lng,
      address: targetCoord.address,
      accessToken: token.authorization,
      refreshToken: token.refresh,
      imgSrc,
    };
    // if(maxNum <1){}

    mutate(requestBody);
  };

  /* const fetchOgData = async (url: string) => {
    try {
      await axios
        .get(`/api/fetch-og-data?url=${url}`)
        .then((res) => setProductImg(res.data.image.url));
      console.log(productImg);
    } catch (error) {
      console.log(error);
    }
  }; */
  const getLinkMetaData = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    if (
      e.target.value.includes('www.coupang.com') ||
      !e.target.value.includes('https')
    )
      return;
    /* const data = await axios({
      method: 'post',
      url: '/api/getLinkMetaInfo',
      data: { url: e.target.value },
    });
    console.log(data); */
    return axios({
      method: 'get',
      url: e.target.value,
    }).then(({ data, status }) => {
      if (status !== 200) {
        alert('이미지 정보를 불러오는데 실패했습니다.');
      }
      const $ = cheerio.load(data);
      $('meta').each((_, el) => {
        const key = $(el).attr('property')?.split(':')[1]; // ? 옵셔널 체이닝 앞에가 있으면 실행
        if (key) {
          const value = $(el).attr('content');
          const checkUrl = value?.includes('https');
          if (key === 'image' && checkUrl) {
            setProductImg(value);
          }
        }
      });
    });
  };

  return (
    <LoginChecker path="/addnew">
      <Box component="form" onSubmit={handleSubmit}>
        <div className="flex justify-center m-7 my-12">
          <FormControl fullWidth className="flex flex-col w-10/12 max-w-lg">
            <Stack spacing={4}>
              <div id="map" className="w-[100%] h-[350px]"></div>
              <p>
                <em>위치 검색 후 지도를 한 번 클릭해주세요!</em>
              </p>
              <div className="flex width-[100%]">
                <Input
                  id="location"
                  name="location"
                  type="text"
                  label="도로명주소 검색"
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
                value={targetCoord.address}
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
                value={price}
                inputProps={{ min: 0 }}
                onChange={onChange}
              />
              <div className="flex items-center">
                <img
                  className="h-40 w-40 mb-7 m-auto"
                  src={productImg}
                  alt={'상품이미지'}
                />
                <span>
                  상품 링크를 입력하면 자동으로 상품이미지가 등록됩니다
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
            </Stack>
          </FormControl>
        </div>
      </Box>
    </LoginChecker>
  );
};

export default AddNewPage;
