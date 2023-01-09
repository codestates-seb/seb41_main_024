import { useRouter } from 'next/router';
import { AppBar, Divider } from "@mui/material";
import arrowback from '../../../../src/assets/header/arrowback.svg'
import menu from '../../../../src/assets/header/menu.svg'
import logo from '../../../../src/assets/logos/logoFooter.svg'

const ChatHeader = () => {
  const router = useRouter();

  return (
    <>
      <AppBar
        className='px-4 py-4 border-b border-b-inherit' 
        position="static" 
        color="inherit" 
        elevation={0} 
        sx={{ height: '50px'}}
      >
        <div className='flex items-center justify-center'>
          <button className="border-0 bg-inherit" type="button" onClick={() => router.back()}>
            <img src={arrowback} alt="뒤로가기" />
          </button>
          <div className='flex flex-1 justify-center'>
            <img src={logo} alt="로고" />
          </div>
          <button className="border-0 bg-inherit" type="button">
            <img src={menu} alt="메뉴열기" />
          </button>
        </div>
      </AppBar>
      <Divider />
    </>
  )
}

export default ChatHeader;