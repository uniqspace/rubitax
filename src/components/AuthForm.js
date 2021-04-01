import { makeStyles } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo.svg';

const Container = styled.form`
  flex: 1;
  min-height: 100vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 700px) {
     padding: 0 12px;
   }
`;

const FormContainer = styled.div`
  width: 656px;
  height: 493px;
  background: #FFFFFF;
  box-shadow: 0px 12px 76px rgba(226, 48, 142, 0.1);
  border-radius: 8px;
  padding: 120px 133px 82px 133px;
  display: flex;
  flex-direction: column;
  align-items: center;
   & .MuiFormControl-root {
      margin-bottom: 22px;
   }
  @media screen and (max-width: 700px) {
     width: 100%;
     height: 350px;
     padding: 40px 24px;
   }
`;

const useStyles = makeStyles(() => ({
  logo: {
    marginBottom: 92,
  },
}));

const AuthForm = ({children}) => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.logo}>
        <img style={{width: 152, height: 50}} src={logo} alt="Logo" />
      </div>
      <FormContainer>
        {children}
      </FormContainer>
    </Container>
  );
}

export default AuthForm;