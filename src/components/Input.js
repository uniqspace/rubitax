import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiInputBase-root': {
      background: '#FBF8F8',
      '&:before': {
        borderColor: '#949494',
        opacity: 0.3
      },
      '&:after': {
        width: '0%',
        right: 'initial',
        transform: 'scaleX(1)',
        transition: 'width 0.2s ease',
        borderBottomWidth: 1,
      },
      '&.Mui-focused:after': {
        width: '100%',
      },
    },
    '& .MuiFormLabel-root': {
      top: 3,
    }
  }
}));

function Input({
  name, label, control, register, error, onChange, className
}) {
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={props => (
        <TextField
          ref={register}
          fullWidth
          label={label}
          variant="filled"
          className={clsx(classes.textField, className)}
          onChange={e => {
            props.onChange(e);
            onChange();
          }}
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
}

export default Input;