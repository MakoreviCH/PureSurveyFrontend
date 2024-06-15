import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './DropDownProfileMenu';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useParams } from 'react-router';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

interface NavProps{
  pageName:string
}

export default function NavBar({pageName}:NavProps) {

    const nav = useNavigate();
    
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const handleNavClick = (pageName:string) => {
      nav(`/${pageName}`);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
          <AccountMenu/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key="Survey" disablePadding>
          <ListItemButton onClick={(o)=>handleNavClick("survey")}>
              <ListItemText primary="Survey"/>
            </ListItemButton>
          </ListItem>
        <ListItem key="Survey Units" disablePadding>
        <ListItemButton onClick={(o)=>handleNavClick("survey-unit")}>
            <ListItemText primary="Survey Units"/>
          </ListItemButton>
        </ListItem>
        <ListItem key="Targetings" disablePadding>
          <ListItemButton onClick={(o)=>handleNavClick("targeting")}>
            <ListItemText primary="Targetings"/>
          </ListItemButton>
        </ListItem>
        <ListItem key="Unit Appearances" disablePadding>
        <ListItemButton onClick={(o)=>handleNavClick("appearance")}>
            <ListItemText primary="Unit Appearances"/>
          </ListItemButton>
        </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}