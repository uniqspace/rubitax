import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

import SearchBox from './SearchBox';

import avatar from '../assets/images/avatar.png';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    height: 88,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#FFFFFF',
    boxShadow: 'none'
  },
  toolbar: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 36,
    paddingRight: 36
  },
  menubar: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    display: 'flex',
    marginLeft: 14.5,
    marginRight: 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  iconButton: {
    padding: 7
  },
  iconBadge: {
    '& .MuiBadge-badge': {
      right: 3,
      bottom: 10,
      background: '#FFFFFF',
      color: theme.palette.primary.main
    }
  }
}));

function Topbar(props) {
  const { handleDrawerToggle } = props;
  const classes = useStyles();
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon color="primary" />
        </IconButton>
        <Hidden smDown implementation="css">
          <SearchBox />
        </Hidden>
        <div className={classes.menubar}>
          <IconButton color="inherit" className={classes.iconButton}>
            <SettingsIcon color="primary" />
          </IconButton>
          <IconButton color="inherit" className={classes.iconButton}>
            <Badge
              badgeContent={9}
              color="primary"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              className={classes.iconBadge}
            >
              <NotificationsIcon color="primary" />
            </Badge>
          </IconButton>
          <Avatar className={classes.avatar} alt="Remy Sharp" src={avatar} />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;