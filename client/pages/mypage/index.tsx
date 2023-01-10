import UserEdit from './edit';
import UserInfo from './[memberId]';

const Mypage = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center items-end h-[4.5rem] mb-10'>
        <p className='text-xl'>마이페이지</p>
      </div>
      {/* <UserInfo /> */}
      <UserEdit />
    </div>
  )
}

export default Mypage;