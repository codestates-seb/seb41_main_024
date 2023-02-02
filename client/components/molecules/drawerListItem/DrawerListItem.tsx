import Link from 'next/link';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { drawerListItemPropsType } from './drawerListItemType';

const DrawerListItem = ({ text, path, onClick, children }: drawerListItemPropsType) => {
  return (
    <div key={text}>
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
    </div>
  );
};

export default DrawerListItem;
