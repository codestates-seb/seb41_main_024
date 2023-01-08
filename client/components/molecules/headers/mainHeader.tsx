import { AppBar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoRow from '../../atoms/logos/LogoRow';

const mainHeader = () => {
  return (
    <AppBar 
    className='px-4 py-4 border-b border-b-inherit' 
    position="static" 
    color="inherit" 
    elevation={0} 
    sx={{width: '390px', height: '51px'}}
    >
      <div className='flex'>
        <Typography className='flex-1' href="/" component="a">
          <LogoRow />
        </Typography>
        <SearchIcon />
        <MenuIcon />
      </div>
    </AppBar>
  )
}

export default mainHeader;