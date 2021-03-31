import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as S from './styled';

import logo from '../../assets/images/logo.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh'
  },
  paper: {
    padding: '100px 100px',
    display: 'flex',
    flexDirection: 'column',
    border: 0,
    boxShadow: '0px 12px 76px rgba(226, 48, 142, 0.1)',
    marginTop: 50,
    '& .MuiFormControl-root': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  button: {
    width: 198,
    height: 63,
    justifySelf: 'center',
    fontWeight: '900',
  },
  inputText: {
    color: 'rgba(0,0,0,0.87)',
    fontSize: '16px',
    letterSpacing: '0.5px',
    lineHeight: '28px',
    textAlign: 'center',
  },
  logo: {
    marginBottom: 92,
  },
  image: {
    width: 152, height: 50
  },
  input: {
    marginBottom: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInputBase-root': {
      backgroundColor: '#FBF8F8',
      borderRadius: '3px 3px 0px 0px',
      height: 56,
    },
    '& .MuiInputBase-input': {
      // textAlign: 'center'
    },
    '& .MuiFilledInput-underline:before': {
      borderBottomColor: '#E5E5E5',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: '#E4318B',
      borderBottomWidth: 1,
      transformOrigin: 'left center',
    },
    '& .MuiFormLabel-root': {
      // left: 'auto',
      // marginRight: 20,
      top: 3,
    }
  },
  link: {
    marginTop: 35,
    textDecoration: "underline",
    color: 'rgba(0, 0, 0, 0.3)',
  }
}));


function Forgot(props) {
  const classes = useStyles();

  return (
    <S.Container>
      <div className={classes.logo}>
        <img className={classes.image} src={logo} alt="Logo" />
      </div>
      <S.FormContainer>
      <TextField
        className={classes.input}
        fullWidth
        label="Email address"
        name="email"
        size="small"
        type="email"
        variant="filled"
      />
        <Button className={classes.button} color="primary" type="submit" variant="contained">
          Submit
        </Button>
      </S.FormContainer>
    </S.Container>
  );
}

export default Forgot;