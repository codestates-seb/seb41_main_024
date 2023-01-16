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
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useState } from 'react';
import useInput from '../../hooks/addNewHooks/useInput';

const AddNewPage = () => {
  const [inputValue, onChange, setInputValue] = useInput({
    productName: '',
    price: 0,
    url: '',
    category: '상품 쉐어링',
    quantity: '1',
    spot: '',
    detail: '',
  });

  const { productName, price, url, category, quantity, spot, detail } =
    inputValue;

  const handleSubmit = (e) => {
    // HTTP 요청
    console.log('submited!');
    e.prventDefault();
    console.log(e);
  };

  // console.log(form);

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
              />
              <Label htmlFor={'productName'} labelText={''} />
              <Input
                id="price"
                name="price"
                type="number"
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
                id="spot"
                name="spot"
                type="text"
                label="쉐어링 위치"
                value={spot}
                onChange={onChange}
              />
              <Label htmlFor={'spot'} labelText={''} />
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
              <FormButton
                className="h-14 mt-4"
                variant="contained"
                content="쉐어링 등록"
                type="submit"
              />
            </Stack>
          </FormControl>
        </div>
      </form>
    </div>
  );
};

export default AddNewPage;
