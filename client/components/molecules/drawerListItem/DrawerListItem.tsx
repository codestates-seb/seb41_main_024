import Link from 'next/link';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { drawerListItemPropsType } from './drawerListItemType';

const DrawerListItem = ({ text, path, onClick, children }: drawerListItemPropsType) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={onClick}>
        {children ? children 
        : (path ? 
          (
            <Link href={path}>
              <ListItemText primary={text} />
            </Link>
          ) 
          : (<ListItemText primary={text} />)
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;
