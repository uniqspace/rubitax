import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import PieChartIcon from '@material-ui/icons/PieChart';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import HelpIcon from '@material-ui/icons/Help';
import PersonIcon from '@material-ui/icons/Person';

import SearchBox from './SearchBox';

import logo from '../assets/images/logo.svg';

const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  drawer: {
    background: '#FFFFFF',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: 0
  },
  logo: {
    padding: '29.26px 25px 27.26px 25px',
    '& > img': {
      display: 'block'
    }
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listSubheader: {
    padding: '14px 24px 5px 24px',
    lineHeight: '20px'
  },
  listItem: {
    padding: '14px 24px',
    '& .MuiListItemIcon-root': {
      paddingRight: 13,
      minWidth: 'initial',
      '& > svg': {
        width: 16,
        height: 16
      }
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: 0,
      '& .MuiTypography-root': {
        fontSize: 14,
        lineHeight: '20px'
      }
    }
  },
  divider: {
    marginTop: 19,
    marginBottom: 8,
  },
  image: {
    width: 130,
    height: 42,
  }
}));

function Sidebar(props) {
  const { window, mobileOpen, handleDrawerToggle } = props;

  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden xsUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.logo}>
            <img src={logo} alt="Logo" />
          </div>
          <SearchBox className={classes.searchBox} />
          <List className={classes.list}>
            <MainListItems />
          </List>
          <Divider className={classes.divider} />
          <List className={classes.list}>
            <SecondaryListItems />
          </List>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper),
          }}
          open={true}
        >
          <div className={classes.logo}>
            <img className={classes.image} src={logo} alt="Logo" />
          </div>
          <List className={classes.list}>
            <MainListItems />
          </List>
          <Divider className={classes.divider}  />
          <List className={classes.list}>
            <SecondaryListItems />
          </List>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;

function MainListItems() {
  const classes = useStyles();
  return (
    <div>
      <ListSubheader className={classes.listSubheader}>DASHBOARD</ListSubheader>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Item 1" />
      </ListItem>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <DirectionsBusIcon />
        </ListItemIcon>
        <ListItemText primary="Item 2" />
      </ListItem>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <DirectionsBusIcon />
        </ListItemIcon>
        <ListItemText primary="Item 3" />
      </ListItem>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Item 4" />
      </ListItem>
    </div>
  );
}

function SecondaryListItems() {
  const classes = useStyles();
  return (
    <div>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItem>
    </div>
  );
}