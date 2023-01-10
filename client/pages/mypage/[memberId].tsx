import base from '../../public/imageBox/base-box.svg' 

const UserInfo = () => {
  return (
      <div className='flex flex-col justify-center items-center h-96'>
        <div>
          <img className='h-40 w-40 mb-6' src={base} alt={"유저이미지"}/>
          <p className='mb-2'>입력하신 이메일</p>
          <p className='mb-2'>입력하신 닉네임</p>
          <p className='mb-2'>입력하신 전화번호</p>
        </div>
      </div>
  )
}

export default UserInfo;