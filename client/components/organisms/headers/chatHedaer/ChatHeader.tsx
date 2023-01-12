import * as React from 'react';
import { useRouter } from 'next/router';
import { AppBar, Button, Divider, Menu, MenuItem } from '@mui/material';
import {ReactComponent as ArrowbackIcon} from '../../../../public/header/arrowback.svg';
import {ReactComponent as MenuIcon} from '../../../../public/header/menu.svg';
import {ReactComponent as Logo} from '../../../../public/logos/logoFooter.svg';

const ChatHeader = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        className="px-4 py-4 border-b border-b-inherit"
        position="static"
        color="inherit"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <div className="flex items-center justify-center">
          <Button
            className="border-0 m-0 p-0 bg-inherit"
            type="button"
            onClick={() => router.back()}
          >
            <ArrowbackIcon />
          </Button>
          <div className="flex flex-1 justify-center">
            <Logo />
          </div>
          <Button
            className="border-0 m-0 p-0 bg-inherit"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            type="button"
          >
            <MenuIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem sx={{color: theme => theme.palette.primary.main}} onClick={handleClose}>
              채팅방 나가기
            </MenuItem>
            <MenuItem sx={{color: theme => theme.palette.primary.main}} onClick={handleClose}>
              신고
            </MenuItem>
            <MenuItem sx={{color: theme => theme.palette.primary.main}} onClick={handleClose}>
              닫기
            </MenuItem>
          </Menu>
        </div>
      </AppBar>
      <Divider />
    </>
  );
};

export default ChatHeader;
