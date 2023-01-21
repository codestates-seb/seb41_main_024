import Link from 'next/link';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { drawerListItemPropsType } from './drawerListItemType';

const DrawerListItem = ({ text, path, onClick }: drawerListItemPropsType) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={onClick}>
      {path && (
        <Link href={path}>
          <ListItemText primary={text} />
        </Link>
      )}
      {!path && <ListItemText primary={text} />}
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;
