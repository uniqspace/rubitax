import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';

import { FormsContextProvider } from './FormsContext';
import { Container } from '@material-ui/core';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Form from '../../components/Form';
import FileForm from '../../components/FileForm';
import Button from '../../components/Button';

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
  connectButton: {
    width: '350.67px',
    height: '75.63px',
    alignSelf: 'center',
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
  heading: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '20px',
    marginBottom: '22.57px',
  },
  textField: {
    '& .MuiInputBase-root': {
      background: '#FBF8F8'
    }
  },
}));

function Forms(props) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
        <FormsContextProvider>
          <Paper className={classes.paper}>
            <span className={classes.heading}>HEADING</span>
            <Form />
            <Form withRemoveButton />
            <FileForm />
            <Button className={classes.connectButton} text="Connect" />
          </Paper>
        </FormsContextProvider>
        </Container>
      </main>
    </div>
  );
}

export default Forms;