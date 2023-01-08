import { useRouter } from 'next/router';
import { AppBar } from "@mui/material";

const ChatHeader = () => {
  const router = useRouter();

  return (
    <AppBar 
      className='px-4 py-4 border-b border-b-inherit' 
      position="static" 
      color="inherit" 
      elevation={0} 
      sx={{width: '390px', height: '51px'}}
    >
      <div className='flex items-center justify-center'>
        <button className="border-0 bg-inherit" type="button" onClick={() => router.back()}>
          <img src={"/header/arrowback.svg"} alt="뒤로가기" />
        </button>
        <div className='flex flex-1 justify-center'>
          <img src={"/logos/logoFooter.svg"} alt="로고" />
        </div>
        <button className="border-0 bg-inherit" type="button">
          <img src={"/header/menu.svg"} alt="메뉴열기" />
        </button>
      </div>
    </AppBar>
  )
}

export default ChatHeader;