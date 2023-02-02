import Input from '../../atoms/input/Input';
import { locationDataType } from '../../container/addressBook/AddressBook';
import FormButton from '../../molecules/formbutton/FormButton';

const AddressBookList = ({
  addressBookList,
  handleDeleteModalOpen,
  selectAddress,
  content,
  buttonColor,
}: {
  addressBookList: locationDataType[];
  handleDeleteModalOpen?: (id: number) => void;
  selectAddress?: (locationData: locationDataType) => void;
  content: string;
  buttonColor: string;
}) => {
  return (
    <>
      {addressBookList?.map((item: locationDataType) => (
        <div
          key={item.locationId}
          className="flex w-[100%] my-4 px-4 screen-tablet:block"
        >
          <Input
            className="mr-4"
            id="locationName-input"
            name="locationName"
            type="text"
            label="장소명"
            value={item.locationName}
          />
          <div className="flex flex-1 screen-tablet:mt-4">
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
              className={`bg-[${buttonColor}] text-[white] ml-[10px] h-[52px] screen-tablet:px-[0.625rem]`}
              content={content}
              onClick={() => {
                if (handleDeleteModalOpen) {
                  return handleDeleteModalOpen(item.locationId);
                } else if (selectAddress) {
                  return selectAddress(item);
                }
              }}
            ></FormButton>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddressBookList;
