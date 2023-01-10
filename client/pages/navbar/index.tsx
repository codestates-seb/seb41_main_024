import Navbar from '../../components/organisms/navbar/Navbar';
import Badge from '../../components/atoms/badge/Badge';
import Spot from '../../components/molecules/spot/Spot';
import ChatItem from '../../components/organisms/chatItem/ChatItem';

import ChatIcon from '../../public/navbar/ChatIcon';

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
        <ChatItem />
      </div>
      <div className="m-10"></div>
      <div className="m-10"></div>
    </>
  );
};

export default TestPage;
