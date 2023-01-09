import { AppBar, Divider } from "@mui/material";
import Link from 'next/link';
import search from '../../../../src/assets/header/search.svg'
import navigator from '../../../../src/assets/header/navigator.svg'
import logo from '../../../../src/assets/logos/logoRow.svg'

const MainHeader = () => {
  return (
    <>
      <AppBar 
        className='px-4 py-4 border-b border-b-inherit' 
        position="static" 
        color="inherit" 
        elevation={0} 
        sx={{ height: '50px'}}
      >
        <div className='flex'>
          <div className='flex-1'>
            <Link  href="/" >
              <img src={logo} alt="메인로고" />
            </Link>
          </div>
          <button className="border-0 bg-inherit mr-4" type="button">
            <img src={search} alt="검색하기" />
          </button>
          <button className="border-0 bg-inherit ml-4" type="button">
            <img src={navigator} alt="메뉴열기" />
          </button>
        </div>
      </AppBar>
      <Divider />
    </>
  )
}

export default MainHeader;