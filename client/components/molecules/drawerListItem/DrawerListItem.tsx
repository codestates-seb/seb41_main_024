import Link from 'next/link';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { drawerListItemProps } from './Type_drawerListItem';

const DrawerListItem = ({ text, path }: drawerListItemProps) => {
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
