import { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import RegisterPassword from '../Components/PasswordAuth/RegisterPassword';

const dashboardDefault: {
  passwordAuth: any
  todos: {
    activeList: any[]
    doneList: any[]
  }
  urls: any[]
  passwords: any[]
} = {
  passwordAuth: {},
  todos: {
    activeList: [],
    doneList: []
  },
  urls: [],
  passwords: []
}

const drawerWidth = 240;
interface TemplateProps {children?: JSX.Element}
interface AppBarProps extends MuiAppBarProps {open?: boolean}
const appBarNavigate = [{
    title: 'TodoList',
    path: '/'
  }, {
    title: 'Url Saver',
    path: '/urlSaver'
  }, {
    title: 'Password Saver',
    path: '/passwordSaver'
  }, {
    title: 'Wallet Control',
    path: '/walletControl'
}]


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Templates = (props: TemplateProps): JSX.Element => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage) ? JSON.parse(currentLocalStorage) : null
  const registerModal = !currentLocalStorageJSON?.passwordAuth.email ? true : false
    if (currentLocalStorage == null) {
      localStorage.setItem('dashboard', JSON.stringify(dashboardDefault))
    }


    const [open, setOpen] = useState(window.innerWidth <= 600 ? false : true);
    const handleDrawerOpen = () => {setOpen(true);};
    const handleDrawerClose = () => {setOpen(false);};
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const theme = useTheme();
    const { children } = props

    const changeNavigate = (currentPath: string) => {
        setCurrentPath(currentPath)
    }

  return (    
    <Box sx={{ display: 'flex' }}>
      {registerModal ? (
        <RegisterPassword />
      ) : null}
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
            Dashboard
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ display: window.innerWidth < 600 ? 'none' : 'block' }}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {appBarNavigate.map((item, index) => (
            <Link to={`${item.path}`} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
            <ListItem disablePadding sx={{ display: 'block' , background: currentPath === item.path ? '#eee' : null }} onClick={() => changeNavigate(item.path)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.title === 'TodoList' ? <AssignmentIcon /> : null}
                  {item.title === 'Wallet Control' ? <AccountBalanceWalletIcon /> : null}
                  {item.title === 'Url Saver' ? <LinkIcon /> : null}
                  {item.title === 'Password Saver' ? <LockIcon /> : null}
                </ListItemIcon>
                    <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}

export default Templates;