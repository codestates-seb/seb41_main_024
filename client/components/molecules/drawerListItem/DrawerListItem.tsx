import Link from 'next/link';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

const DrawerListItem = ({ text, path }: any) => {
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
