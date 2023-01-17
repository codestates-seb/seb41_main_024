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
import { inputType } from '../../hooks/addNewHooks/useInputType';

const AddNewPage = () => {
  const { isLoading, error, mutate } = useMutation(uploadPost, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { inputValue, onChange, handleSubmit } = useInput(
    {
      title: '',
      price: '',
      productsLink: '',
      category: '상품 쉐어링',
      maxNum: '1',
      address: '',
      content: '',
    },
    mutate
  );

  const { title, price, productsLink, category, maxNum, address, content } =
    inputValue;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <div className="flex justify-center m-7 my-12">
        <FormControl fullWidth className="flex flex-col w-10/12 max-w-lg">
          <Stack spacing={4}>
            <img
              className="h-40 w-40 mb-7 m-auto"
              src={base}
              alt={'유저이미지'}
            />
            <Input
              id="title"
              name="title"
              type="text"
              label="상품명"
              value={title}
              onChange={onChange}
            />
            <Label htmlFor={'title'} labelText={''} />
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
              id="productsLink"
              name="productsLink"
              type="text"
              label="상품 링크"
              value={productsLink}
              onChange={onChange}
            />
            <Label htmlFor={'productsLink'} labelText={''} />
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
              <Input
                id="maxNum"
                name="maxNum"
                value={maxNum}
                label="모집 인원"
                type="number"
                onChange={onChange}
              ></Input>
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
  );
};

export default AddNewPage;
