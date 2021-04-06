import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';

import TabPanel from '../../components/TabPanel';

import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';

import { OnBoardingContextProvider } from './OnBoardingContext';
import { Container } from '@material-ui/core';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    marginTop: 88,
    minHeight: 'calc(100vh - 88px)'
  },
  container: {
    padding: '20px 12px',
    [theme.breakpoints.up('sm')]: {
      padding: '35px 36px 25px 36px',
    },
  },
  paper: {
    padding: '12px 24px',
    display: 'flex',
    flexDirection: 'column',
    border: 0,
    boxShadow: '0px 12px 76px rgba(226, 48, 142, 0.1)',
    [theme.breakpoints.up('sm')]: {
      padding: '27px 45px',
    },
  },
  tabHeader: {
    borderBottom: `2px solid rgba(0, 0, 0, 0.2)`,
    '&:hover': {
      background: '#FAFAFA'
    },
    '&.Mui-selected': {
      color: '#000000',
      borderBottom: 0
    },
    '& .MuiTab-wrapper': {
      textAlign: 'center',
      alignItems: 'start',
      fontSize: 12
    }
  },
  textField: {
    '& .MuiInputBase-root': {
      background: '#FBF8F8'
    }
  },
  pdfViewer: {
    marginTop: 66
  }
}));

function Onboarding(props) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [activedTab, setActivedTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setActivedTab(newValue);
    window.scrollTo(0, 0);
  };

  const moveStepTwo = () => {
    setFormSubmitted(true);
    setActivedTab(1);
    window.scrollTo(0, 0);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        minimized={minimized}
      />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        minimized={minimized}
        setMinimized={setMinimized}
      />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
        <OnBoardingContextProvider>
          <Paper className={classes.paper}>
            <Tabs
              value={activedTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChangeTab}
              variant="fullWidth"
            >
              <Tab
                className={classes.tabHeader}
                label="STEP 1"
              />
              <Tab
                className={classes.tabHeader}
                label="STEP 2"
                disabled={!formSubmitted}
              />
            </Tabs>
            <TabPanel value={activedTab} index={0}>
              <OnboardingStep1
                moveStepTwo={moveStepTwo}
              />
            </TabPanel>
            <TabPanel value={activedTab} index={1}>
              <OnboardingStep2 />
            </TabPanel>
          </Paper>
        </OnBoardingContextProvider>
        </Container>
      </main>
    </div>
  );
}

export default Onboarding;