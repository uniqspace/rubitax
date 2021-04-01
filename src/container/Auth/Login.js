import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContextProvider } from './AuthContext';

import AuthForm from '../../components/AuthForm';
import Button from '../../components/Button';
import Input from '../../components/Input';

const useStyles = makeStyles((theme) => ({
  button: {
    width: 198,
    height: 63,
    justifySelf: 'center',
    fontWeight: '900',
    marginTop: 4,
  },
  logo: {
    marginBottom: 92,
  },
  link: {
    marginTop: 35,
    textDecoration: "underline",
    color: 'rgba(0, 0, 0, 0.3)',
  }
}));


const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

function Login() {
  const classes = useStyles();


  const { control, register, trigger, errors } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <AuthContextProvider>
      <AuthForm>
        <Input
          name="login"
          label="Login"
          control={control}
          register={register}
          error={errors.login?.message}
          onChange={() => trigger("login")}
        />
        <Input
          name="password"
          label="Password"
          control={control}
          register={register}
          error={errors.password?.message}
          onChange={() => trigger("password")}
        />
        <Button className={classes.button} text="submit" />
          <Link href="/forgot" className={classes.link}>forget password</Link>
      </AuthForm>
    </AuthContextProvider>
  );
}

export default Login;