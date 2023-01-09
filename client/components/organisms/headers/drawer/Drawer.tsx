import { Divider, List } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { drawerProps } from './Type_drawer';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const DrawerList = ({window, isOpen, onClick, children}: drawerProps) => {
  const container = window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const drawerWidth = 240;

  return (
    <Drawer
      container={container}
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
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {children}
      </List>
    </Drawer>
  )
}

export default DrawerList;