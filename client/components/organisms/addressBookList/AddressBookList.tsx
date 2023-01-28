import Input from '../../atoms/input/Input';
import { locationDataType } from '../../container/addressBook/AddressBook';
import FormButton from '../../molecules/formbutton/FormButton';

const AddressBookList = ({
  addressBookList,
  handleDeleteModalOpen,
}: {
  addressBookList: locationDataType[];
  handleDeleteModalOpen: (id: number) => void;
}) => {
  return (
    <>
      {addressBookList?.map((item: locationDataType) => (
        <div key={item.locationId} className="flex w-[100%] my-4">
          <Input
            className="mr-4"
            id="locationName-input"
            name="locationName"
            type="text"
            label="장소명"
            value={item.locationName}
          />
          <Input
            className="flex-grow"
            id="address-input"
            name="address"
            type="text"
            label="주소"
            disabled
            value={item.address}
          />
          <FormButton
            variant="contained"
            className="bg-[red] text-[white] ml-[10px] h-[52px]"
            content="삭제하기"
            onClick={() => handleDeleteModalOpen(item.locationId)}
          ></FormButton>
        </div>
      ))}
    </>
  );
};

export default AddressBookList;
