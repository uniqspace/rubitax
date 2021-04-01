import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Container from '@material-ui/core/Container';
// import Topbar from './components/Topbar';
// import Sidebar from './components/Sidebar';

import Onboarding from './container/Onboarding/Onboarding';
import Login from './container/Login/Login';
import Forgot from './container/Forgot/Forgot';

import './assets/font/Lato/lato.css';
import './assets/css/style.css';

const authenticated = true;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    marginTop: !authenticated ? 88 : 0,
    minHeight: 'calc(100vh - 88px)',
    backgroundColor: 'white',
  },
  container: {
    padding: '20px 12px',
    [theme.breakpoints.up('sm')]: {
      padding: '25px 36px',
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function App() {
  const classes = useStyles();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  return (
    <>
    {/* <div className={classes.root}> */}
      <CssBaseline />
      {/* {!authenticated &&
      <>
        <Topbar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </>
      } */}
      {/* <main className={classes.content}>
        <Container maxWidth="lg" className={!authenticated ?  classes.container : ""}> */}
          <Router>
            <Switch>
              <Redirect exact from="/" to={{pathname: '/login'}} />
              <Route exact path="/onboarding" component={Onboarding} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot" component={Forgot} />
            </Switch>
          </Router>
        {/* </Container>
      </main> */}
    {/* </div> */}
    </>
  );
}