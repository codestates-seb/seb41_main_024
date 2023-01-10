import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import Link from 'next/link';
import { drawerListItem } from './Type_drawerListItem';

const DrawerListItem = ({text, path} : drawerListItem ) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton>
        <Link href={`${path}`}>
          <ListItemText primary={text} />
        </Link>
      </ListItemButton>
    </ListItem>
  )
}

export default DrawerListItem;