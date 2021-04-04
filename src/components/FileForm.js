import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from './Button';
import UploadModal from './UploadModal';
import UploadFileInput from './UploadFileInput';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '60px',
    marginBottom: '38px',
    '& .MuiAccordionSummary-root': {
      border: '1px solid #EDEDED',
      backgroundColor: '#EDEDED',
      height: 57,
      padding: '0 50px',
      minHeight: '57px',
      borderRadius: '4px 4px 0px 0px',
    },
    '& .MuiPaper-elevation1': {
      boxShadow:  '0 0 0',
    },
    '& .MuiIconButton-label': {
      color: '#B0B0B0',
    },
    '& .MuiAccordionDetails-root': {
      border: '1px solid #EDEDED',
      borderTopWidth: 0,
      borderRadius: 0,
      padding: '10px 50px 43px 50px',
    }
  },
  heading: {
    fontSize: '14px',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#A3A3A3',
  },
  buttonsContainer: {
    marginTop: '19px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: '0 16px',
    justifyContent: 'flex-end',
    marginBottom: '10px',
  },
  button: {
    width: '161.33px',
    height: '48px',
  },
}));

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

export default function FileForm() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, register, trigger, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>SUBHEADING 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={4}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadFileInput />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadFileInput />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadFileInput />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UploadFileInput />
        </Grid>
        <div className={classes.buttonsContainer}>
          {/* <IconButton text="Add Form" /> */}
           <UploadModal
              open={open}
              setOpen={setOpen}
              name="idScreen"
              control={control}
              register={register}
              setValue={() => {}}
              onChange={() => trigger("idScreen")}
            />
          <Button onClick={handleOpen} className={classes.button} text="List of uploads" />
        </div>
        </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}