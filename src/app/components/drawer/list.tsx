'use client';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Link from 'next/link';

interface ListDrawerProps {
  open: boolean;
  listOfItems: string[];
  icons: JSX.Element[];
  sectionName: string;
}
export const ListDrawer = ({
  open,
  listOfItems,
  icons,
  sectionName
}: ListDrawerProps) => {
  return (
    <List>
      {listOfItems.map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          <Link
            href={`/dashboard/${sectionName.toLocaleLowerCase()}/${text.toLocaleLowerCase()}`}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
