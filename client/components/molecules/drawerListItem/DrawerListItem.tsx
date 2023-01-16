import Link from 'next/link';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { drawerListItemProps } from './drawerListItemType';

const DrawerListItem = ({ text, path }: drawerListItemPropsType) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton>
        <Link href={path}>
          <ListItemText primary={text} />
        </Link>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerListItem;
