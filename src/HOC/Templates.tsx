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
import { FormControlLabel, Switch } from '@mui/material';
import useDarkMode from '../store/useDarkMode';

const dashboardDefault: {
  passwordAuth: any
  todos: {
    activeList: any[]
    doneList: any[]
  }
  urls: any[]
  passwords: any[]
  wallet: {
    income: any[]
    spend: any[]
  }
} = {
  passwordAuth: {},
  todos: {
    activeList: [],
    doneList: []
  },
  urls: [],
  passwords: [],
  wallet: {
    income: [],
    spend: []
  }
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

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
  const darkMode = useDarkMode()
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
          <Typography variant="h6" noWrap component="div" sx={{ display: window.innerWidth < 600 ? 'none' : 'block', margin: '.5rem' }}>
            {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ margin: '.5rem' }}>
          <FormControlLabel
              control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
              label=""
              checked={darkMode.darkModeStatus}
              onChange={darkMode.toggleMode}
            />
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
            <ListItem disablePadding sx={{ display: 'block' , background: currentPath === item.path ? '#cfcccc' : null }} onClick={() => changeNavigate(item.path)}>
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