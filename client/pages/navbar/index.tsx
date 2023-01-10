import Navbar from '../../components/organisms/navbar/Navbar';
import Badge from '../../components/atoms/badge/Badge';
import Spot from '../../components/molecules/spot/Spot';
import ChatItem from '../../components/organisms/chatItem/ChatItem';
import ChatIcon from '../../public/navbar/ChatIcon';
import ProductImg from '../../public/chatItem/productImg.svg';

//temp
const TestPage = () => {
  return (
    <>
      <div className="mt-10">
        <Navbar />
      </div>
      <div className="m-10">
        <Badge isOpen={true} />
      </div>
      <div className="m-10">
        <Badge isOpen={false} />
      </div>
      <div className="m-10">
        <Spot spot="서울 서초구" />
      </div>
      <div className="m-10"></div>
      <div className="m-10">
        <ChatIcon />
      </div>
      <div className="mt-10">
        <ChatItem
          thumbnail={ProductImg}
          isOpen={true}
          title="아삭아삭 나주배 3kg"
          price="9,850"
          spot="서울 서초구"
        />
      </div>
      <div className="m-10"></div>
      <div className="m-10"></div>
    </>
  );
};

export default TestPage;
