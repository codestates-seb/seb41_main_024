import MainHeader from '../../components/organisms/headers/mainHeader/MainHeader';
import Footer from '../../components/molecules/footer/Footer';
import BottomNav from '../../components/organisms/bottomNav/BottomNav';
import Input from '../../components/atoms/input/Input';
import FormButton from '../../components/atoms/formbutton/FormButton';
import Label from '../../components/atoms/label/Label';
import Stack from '@mui/material/Stack';
import base from '../../public/imageBox/base-box.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '../../components/atoms/button/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

export async function getServerSideProps(context: { params: { id: number } }) {
  const { id } = context.params;
  console.log(context);
  const { data } = await axios.get(`http://3.34.54.131:8080/api/boards/${id}`);
  // const { data } = await axios.get(`http://localhost:3001/productList/${id}`);

  return {
    props: {
      productData: data,
    },
  };
}

interface productDataProps {
  productData: {
    content: string;
    title: string;
    category: string;
    create_date: string;
    price: number;
    maxNum: number;
    curNum: number;
    deadLine: string;
    productsLink: string;
    nickname: string;
    address: string;
  };
}

const EditPage = ({ productData }: productDataProps) => {
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const router = useRouter();

  const [form, setForm] = useState({
    productName: productData.title,
    price: productData.price,
    url: productData.productsLink,
    category: productData.category,
    quantity: '1',
    address: productData.address,
    detail: productData.content,
  });

  const { productName, price, url, category, quantity, address, detail } = form;

  const onChange = (
    event: React.ChangeEvent<HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  function getProductDetail() {
    // return axios.get(`http://localhost:3001/productList/${productData.id}`, {
    return axios.get(`http://3.34.54.131:8080/api/boards/${productData.id}`, {
      headers: {
        Authorization: cookies.access_token,
        Refresh: cookies.refresh_token,
      },
    });
  }

  const productDetailQuery = useQuery(['productDetail'], getProductDetail, {
    initialData: productData,
  });

  function editProductDetail() {
    return axios
      .patch(`http://3.34.54.131:8080/api/boards/${productData.id}`, form, {
        // return axios
        //   .patch(`http://localhost:3001/productList/${productData.id}`, form, {
        headers: {
          Authorization: cookies.access_token,
          Refresh: cookies.refresh_token,
        },
      })
      .then((res) => {
        router.push(`/nearby/${productData.id}`);
      });
  }

  const editMutation = useMutation(() => editProductDetail());

  console.log(editMutation);

  return (
    <div>
      <div className="flex justify-center m-7 my-12">
        <FormControl fullWidth className="flex flex-col w-10/12 max-w-lg">
          <Stack spacing={4}>
            <img
              className="h-40 w-40 mb-7 m-auto"
              src={base}
              alt={'유저이미지'}
            />
            <Input
              id="productName"
              name="productName"
              type="text"
              label="상품명"
              value={productName}
              onChange={onChange}
              placeholder="야호"
            />
            <Label htmlFor={'productName'} labelText={''} />
            <Input
              id="price"
              name="price"
              type="text"
              label="가격"
              value={price}
              onChange={onChange}
            />
            <Label htmlFor={'price'} labelText={''} />
            <Input
              id="url"
              name="url"
              type="text"
              label="상품 링크"
              value={url}
              onChange={onChange}
            />
            <Label htmlFor={'url'} labelText={''} />
            <FormControl fullWidth>
              <InputLabel id="category">카테고리</InputLabel>
              <Select
                labelId="category"
                name="category"
                value={category}
                label="category"
                onChange={onChange}
              >
                <MenuItem value="상품 쉐어링">상품 쉐어링</MenuItem>
                <MenuItem value="배달">배달</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="quantity">상품 개수</InputLabel>
              <Select
                labelId="quantity"
                name="quantity"
                value={quantity}
                label="quantity"
                onChange={onChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </Select>
            </FormControl>
            <Input
              id="address"
              name="address"
              type="text"
              label="쉐어링 위치"
              value={address}
              onChange={onChange}
            />
            <Label htmlFor={'address'} labelText={''} />
            <Input
              id="detail"
              name="detail"
              label="내용"
              value={detail}
              onChange={onChange}
              rows={10}
              multiline
              className="h-15.75"
            ></Input>
            <Button
              className="h-14 mt-4 bg-primary text-white rounded "
              onClick={() => editMutation.mutate()}
            >
              쉐어링 수정
            </Button>
          </Stack>
        </FormControl>
      </div>
    </div>
  );
};

export default EditPage;
