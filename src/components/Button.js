import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submitBtn: {
    maxWidth: 350.67,
    height: 75.63,
    width: '100%',
    borderRadius: 3,
    '& .MuiButton-label': {
      fontWeight: 900
    }
  }
}));

function Button({text, className = ""}) {
  const classes = useStyles();

  return (
    <MaterialButton
      type="submit"
      variant="contained"
      color="primary"
      className={className ? className : classes.submitBtn}
    >
      {text}
    </MaterialButton>
  );
}

export default Button;