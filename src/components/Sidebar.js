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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import SearchBox from './SearchBox';

import logo from '../assets/images/logo.svg';
import logoMin from '../assets/images/logoMin.svg';

const drawerWidth = 256;
const drawerWidthMin = 87;

const useStyles = makeStyles((theme) => ({
  drawer: {
    background: '#FFFFFF',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerMin: {
    background: '#FFFFFF',
    [theme.breakpoints.up('md')]: {
      width: drawerWidthMin,
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
  drawerPaperMin: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidthMin,
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
    padding: '14px 36.5px',
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
  listItemMin: {
    padding: '16px 36.5px',
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
  },
  imageMin: {
    width: 37,
    height: 42,
  },
  showButton: {
    width: '41px',
    height: '41px',
    borderRadius: '22px',
    background: 'rgba(196, 196, 196, 0.2)',
    marginLeft: '55px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    transform: 'rotate(180deg)',
    cursor: 'pointer',
    '& svg': {
      color: '#A3A3A3',
    }
  },
  showButtonMin: {
    width: '41px',
    height: '41px',
    borderRadius: '22px',
    background: 'rgba(196, 196, 196, 0.2)',
    marginLeft: '23px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    '& svg': {
      color: '#A3A3A3',
    }
  }
}));

function Sidebar(props) {
  const { window, mobileOpen, handleDrawerToggle, setMinimized, minimized } = props;

  // const [minimized, setMinimized] = React.useState(false);

  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={minimized ? classes.drawerMin : classes.drawer} aria-label="mailbox folders">
      <Hidden xsUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: minimized ? classes.drawerPaperMin : classes.drawerPaper,
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
            <MainListItems withoutMinimize={true} minimized={minimized} setMinimized={setMinimized} />
          </List>
          <Divider className={classes.divider} />
          <List className={classes.list}>
            <SecondaryListItems minimized={minimized} />
          </List>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(minimized ? classes.drawerPaperMin : classes.drawerPaper),
          }}
          open={true}
        >
          <div className={classes.logo}>
            <img className={minimized ? classes.imageMin : classes.image} src={minimized ? logoMin : logo} alt="Logo" />
          </div>
          <List className={classes.list}>
            <MainListItems minimized={minimized} setMinimized={setMinimized} />
          </List>
          <Divider className={classes.divider}  />
          <List className={classes.list}>
            <SecondaryListItems minimized={minimized} />
          </List>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;

function MainListItems({setMinimized, minimized, withoutMinimize}) {

  const classes = useStyles();
  return (
    <div>
      <div style={{display: 'flex'}}>
        {!minimized && <ListSubheader className={classes.listSubheader}>DASHBOARD</ListSubheader>}
        {!withoutMinimize ? <div onClick={() => setMinimized(!minimized)} className={minimized ? classes.showButtonMin : classes.showButton}>
          <ChevronRightIcon color="#A3A3A3" />
        </div> : null}
      </div>
      <ListItem button className={minimized ? classes.listItemMin : classes.listItem}>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        {!minimized && <ListItemText primary="Item 1" />}
      </ListItem>
      <ListItem button className={minimized ? classes.listItemMin : classes.listItem}>
        <ListItemIcon>
          <DirectionsBusIcon />
        </ListItemIcon>
        {!minimized && <ListItemText primary="Item 2" />}
      </ListItem>
      <ListItem button className={minimized ? classes.listItemMin : classes.listItem}>
        <ListItemIcon>
          <DirectionsBusIcon />
        </ListItemIcon>
        {!minimized && <ListItemText primary="Item 3" />}
      </ListItem>
      <ListItem button className={minimized ? classes.listItemMin : classes.listItem}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        {!minimized && <ListItemText primary="Item 4" />}
      </ListItem>
    </div>
  );
}

function SecondaryListItems({ minimized }) {
  const classes = useStyles();
  return (
    <div>
      <ListItem button className={minimized ? classes.listItemMin : classes.listItem}>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        {!minimized && <ListItemText primary="Help" />}
      </ListItem>
    </div>
  );
}