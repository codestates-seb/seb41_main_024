import {
  Alert,
  AlertColor,
  Box,
  Button,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ChangeEvent, useEffect, useState } from 'react';
import { exchangeCoordToAddress, searchMap } from '../../../api/kakaoMap';
import {
  deleteAddressBook,
  getAddressBooks,
  getCurrentLocation,
  setAddressBooks,
} from '../../../api/location';
import Input from '../../atoms/input/Input';
import FormButton from '../../molecules/formbutton/FormButton';
import AddressBookList from '../../organisms/addressBookList/AddressBookList';

export interface locationDataType {
  address: string;
  latitude: string;
  locationId: number;
  locationName: string;
  longitude: string;
  memberId: number;
  nickName: string;
}

const MODAL_STYLE = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};
const AddressBook = () => {
  const [center, setCenter] = useState<any>({ lat: 0, lng: 0, address: '' });
  const [error, setError] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [targetCoord, setTargetCoord] = useState<any>({
    lat: 0,
    lng: 0,
    address: '',
  });
  const [isSearch, setIsSearch] = useState(false);

  const [locationName, setLocationName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  //성공시 혹은 실패시에 띄워줄 토스트 설정
  const [toastOption, setToastOption] = useState<{
    severity: AlertColor;
    value: string;
  }>({ severity: 'error', value: '' });
  const [willDeleteLocationId, setWillDeleteLocationId] = useState(0);
  const handleModalOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleDeleteModalOpen = (locationId: number) => {
    setDeleteModalOpen(true);
    setWillDeleteLocationId(locationId);
  };
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  const token = {
    Authorization: Cookies.get('access_token') || '',
    Refresh: Cookies.get('refresh_token') || '',
  };
  const handleSearchAddress = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchAddress(e.target.value);
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: setAddressBooks,
    onSuccess: async (data) => {
      setModalOpen(false);
      setToastOption({ severity: 'success', value: '주소록이 등록되었습니다' });
      setToastOpen(true);
      return queryClient.invalidateQueries(['addressBooks']);
    },
    onError: (error) => {
      alert('주소록 등록에 실패했습니다. 잠시 후 다시 시도해주세요');
    },
  });
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteAddressBook,
    onSuccess: async (data) => {
      setDeleteModalOpen(false);
      setToastOption({ severity: 'success', value: '주소록이 삭제되었습니다' });
      setToastOpen(true);
      return queryClient.invalidateQueries(['addressBooks']);
    },
  });

  const { data } = useQuery({
    queryKey: ['addressBooks'],
    queryFn: () => getAddressBooks({ ...token }),
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    getCurrentLocation(setCenter, setError);
    setIsSearch((prev) => !prev);
  }, []);
  useEffect(() => {
    exchangeCoordToAddress(center, setTargetCoord);
  }, [center.lat, center.lng, isSearch]);
  const addAddressHandler = () => {
    const locationData = targetCoord.address
      ? {
          ...targetCoord,
          locationName,
        }
      : { ...center, locationName };

    const { Authorization, Refresh } = token;
    if (locationName.trim() === '') {
      setToastOpen(true);
      return setToastOption({
        severity: 'error',
        value: '장소의 이름을 입력해주세요',
      });
    } else if (locationData?.address.trim() === '') {
      setToastOpen(true);
      return setToastOption({
        severity: 'error',
        value: '주소를 검색해주세요',
      });
    }

    mutate({ locationData, Authorization, Refresh });
  };
  const removeAddressHandler = () => {
    deleteMutate({ ...token, locationId: willDeleteLocationId });
  };
  const handleToastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastOpen(false);
  };
  return (
    <div className="flex flex-col items-center my-4">
      <div id="map" className="w-[100%] h-[350px]"></div>
      <p className="mb-4">
        <em>지도를 클릭하면 정확한 주소를 저장할 수 있습니다.</em>
      </p>
      <div className="flex w-[100%] mb-4">
        <Input
          id="location"
          name="location"
          type="text"
          label="도로명•지번주소 검색"
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === 'Enter') setIsSearch((prev) => !prev);
            return searchMap(searchAddress, setCenter);
          }}
          onChange={handleSearchAddress}
          helperText="ex) 강남, 이문로"
        />
        <FormButton
          variant="contained"
          className="bg-[#63A8DA] text-[white] ml-[10px] h-[52px]"
          content="주소검색"
          onClick={() => {
            setIsSearch((prev) => !prev);
            searchMap(searchAddress, setCenter);
          }}
        ></FormButton>
      </div>
      <div className="flex w-[100%] justify-start">
        <Input
          className="mr-4"
          id="locationName-input"
          name="locationName"
          type="text"
          label="장소명"
          placeholder="ex) 회사, 집"
          value={locationName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLocationName(e.target.value)
          }
        />
        <Input
          className="flex-grow"
          id="address-input"
          name="address"
          type="text"
          label="주소"
          disabled
          value={targetCoord.address || center.address}
        />
        <FormButton
          variant="contained"
          className="bg-[gray] text-[white] ml-[10px] h-[52px]"
          content="주소록에 추가하기"
          onClick={handleModalOpen}
        ></FormButton>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={MODAL_STYLE}>
            {`${locationName} : ${targetCoord.address || center.address}`}을(를)
            주소록에 추가하시겠습니까?
            <FormButton
              variant="contained"
              className="bg-[#63A8DA] text-[white] ml-[10px] h-[30px]"
              content="추가"
              onClick={addAddressHandler}
            ></FormButton>
            <FormButton
              variant="contained"
              className="bg-[red] text-[white] ml-[10px] h-[30px]"
              content="취소"
              onClick={handleClose}
            ></FormButton>
          </Box>
        </Modal>
        <Modal
          open={deleteModalOpen}
          onClose={handleDeleteModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={MODAL_STYLE}>
            삭제하시겠습니까?
            <FormButton
              variant="contained"
              className="bg-[red] text-[white] ml-[10px] h-[30px]"
              content="예 삭제하겠습니다."
              onClick={removeAddressHandler}
            ></FormButton>
            <FormButton
              variant="contained"
              className="bg-[black] text-[white] ml-[10px] h-[30px]"
              content="취소"
              onClick={handleDeleteModalClose}
            ></FormButton>
          </Box>
        </Modal>
        {/* <FormButton
          variant="contained"
          className="bg-[red] text-[white] ml-[10px] h-[52px]"
          content="주소록 삭제"
          onClick={handleModalOpen}
        ></FormButton> */}
      </div>
      <h2 className="my-4">저장된 주소록</h2>
      <AddressBookList
        addressBookList={data?.data}
        handleDeleteModalOpen={handleDeleteModalOpen}
        content="삭제하기"
        buttonColor="red"
      />

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
        className="bottom-[25%]"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toastOption?.severity}>{toastOption?.value}</Alert>
      </Snackbar>
    </div>
  );
};

export default AddressBook;
