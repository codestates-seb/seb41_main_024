import { Divider, List } from '@mui/material';
import { styled } from '@mui/material/styles';
import { drawerType } from './drawerType';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { ReactComponent as RigthIcon } from '../../../../public/header/arrowbackRight.svg';

const DrawerSet = ({ isOpen, onClick, children }: drawerType) => {
  const drawerWidth = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClick={onClick}
      ModalProps={{
        keepMounted: true,
      }}
      anchor="right"
      sx={{
        display: { xs: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={onClick}>
          <RigthIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <div className='flex w-[100%]' >{children}</div>
    </Drawer>
  );
};

export default DrawerSet;
