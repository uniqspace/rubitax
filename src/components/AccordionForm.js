import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';
import IconButton from './IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiAccordionSummary-root': {
      border: '1px solid #EDEDED',
      backgroundColor: '#FFEFF7',
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
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  leftSideButtonsContainer: {
    flexDirection: 'row',
  },
  button: {
    width: '161.33px',
    height: '48px',
  }
}));

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

export default function AccordionForm({withRemoveButton = false, addForm, withAddButton = true, removeForm, form, expanded, onExpand}) {
  const classes = useStyles();

  const { control, register, trigger, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === form}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={onExpand}
        >
          <Typography className={classes.heading}>SUBHEADING {form}A</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={4}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Dropdown
            name="dropdown1"
            label="Dropdown 1"
            control={control}
            register={register}
            error={errors.fieldFirst?.message}
            onChange={() => trigger("fieldFirst")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="connection"
            label="Connection"
            control={control}
            register={register}
            error={errors.fieldSecond?.message}
            onChange={() => trigger("fieldSecond")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Dropdown
          name="dropdown2"
          label="Dropdown 2"
          control={control}
          register={register}
          error={errors.fieldFirst?.message}
          onChange={() => trigger("fieldThird")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="passowrd"
            label="Password"
            type="password"
            control={control}
            register={register}
            error={errors.fieldFourth?.message}
            onChange={() => trigger("fieldFourth")}
          />
        </Grid>
        <div className={classes.buttonsContainer}>
          <div className={classes.leftSideButtonsContainer}>
          {withRemoveButton && <IconButton onClick={removeForm} isMargined text="Remove Form" icon={<RemoveCircleOutline color="#eeeeff" />} />}
          {withAddButton && <IconButton onClick={addForm} text="Add Form" icon={<AddCircleOutline color="#eeeeff" />} />}
          </div>
          <Button className={classes.button} text="Test connection" />
        </div>
        </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}