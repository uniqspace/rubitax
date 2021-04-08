import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AccordionContextProvider } from './AccordionContext';
import { Container } from '@material-ui/core';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import AccordionForm from '../../components/AccordionForm';
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

function Accordions(props) {
  const classes = useStyles();

  const [forms, setForms] = React.useState([0]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [expanded, setExpanded] = React.useState(0);

  const addForm = (index) => {
    setForms([...forms, index]);
    setExpanded(expanded + 1);
  };

  const removeForm = () => {
    const arrayOfForms = [...forms];
    arrayOfForms.pop();
    setForms(arrayOfForms); 
    setExpanded(expanded - 1);
  }

  const onExpand = (index) => {
    if (index === expanded) {
      setExpanded(undefined);
    } else {
      setExpanded(index);
    }
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
        <Container style={{maxWidth: minimized ? 'none' : '1280px'}} maxWidth="lg" className={classes.container}>
        <AccordionContextProvider>
          <Paper className={classes.paper}>
            <span className={classes.heading}>HEADING</span>
            {forms.map((f) => (
              <AccordionForm
                form={f}
                expanded={expanded}
                onExpand={() => onExpand(f)}
                removeForm={removeForm}
                withAddButton={f === (forms.length - 1)}
                addForm={() => addForm(f + 1)}
                withRemoveButton={Boolean(f) && forms.length - 1 === f}
              />
            ))}
            <FileForm />
            <Button className={classes.connectButton} text="Connect" />
          </Paper>
        </AccordionContextProvider>
        </Container>
      </main>
    </div>
  );
}

export default Accordions;