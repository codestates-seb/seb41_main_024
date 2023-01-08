import { AppBar } from "@mui/material";
import Link from 'next/link';

const MainHeader = () => {
  return (
    <AppBar 
      className='px-4 py-4 border-b border-b-inherit' 
      position="static" 
      color="inherit" 
      elevation={0} 
      sx={{width: '390px', height: '51px'}}
    >
      <div className='flex'>
        <div className='flex-1'>
          <Link  href="/" >
            <img src={"/logos/logoRow.svg"} alt="메인로고" />
          </Link>
        </div>
        <button className="border-0 bg-inherit w-6 mr-1" type="button">
          <img src={"/header/search.svg"} alt="검색하기" />
        </button>
        <button className="border-0 bg-inherit w-6 ml-1" type="button">
          <img src={"/header/navigator.svg"} alt="메뉴열기" />
        </button>
      </div>
    </AppBar>
  )
}

export default MainHeader;