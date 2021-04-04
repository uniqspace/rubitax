import React from 'react';
import MaterialButton from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    maxWidth: 350.67,
    width: '156px',
    height: '48px',
    backgroundColor: '#C7C7C7',
    boxShadow: '0 0 0',
    borderRadius: 3,
    '& .MuiSvgIcon-root': {
      color: 'white'
    },
    '& .MuiButton-label': {
      fontWeight: 900,
      color: 'white !important',
      fontSize: '12px',
    },
  }
}));

function IconButton({text, className = "", icon, isMargined}) {
  const classes = useStyles();

  return (
    <MaterialButton
      type="submit"
      variant="contained"
      color="#C7C7C7"
      endIcon={icon}
      style={{
        marginRight: isMargined ? 16 : 0
      }}
      className={className ? className : classes.iconButton}
    >
      {text}
    </MaterialButton>
  );
}

export default IconButton;