import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContextProvider } from './AuthContext';
import AuthForm from '../../components/AuthForm';
import Input from '../../components/Input';
import Button from '../../components/Button';


const useStyles = makeStyles((theme) => ({
  button: {
    width: 198,
    height: 63,
    justifySelf: 'center',
    fontWeight: '900',
    marginTop: 4,
  },
}));


const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
});

function Forgot() {
  const classes = useStyles();


  const { control, register, trigger, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <AuthContextProvider>
      <AuthForm>
        <Input
          name="login"
          label="Email"
          control={control}
          register={register}
          error={errors.login?.message}
          onChange={() => trigger("login")}
        />
        <Button className={classes.button} text="submit" />
      </AuthForm>
    </AuthContextProvider>
  );
}

export default Forgot;