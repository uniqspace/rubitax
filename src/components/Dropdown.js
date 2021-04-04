import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    '& .MuiFilledInput-root': {
      backgroundColor: '#FBF8F8',
    },
    '& .MuiFormLabel-root': {
      zIndex: 1111,
    },
    '& .MuiFilledInput-underline:before': {
      opacity: 0.3,
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomWidth: 1,
    },
    '& .MuiSelect-root': {
      '&:focus': {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }
    },
    '& .MuiInputLabel-formControl': {
      top: 5,
      left: 13
    }
    // '& .MuiInputBase-root': {
    //   background: '#FBF8F8',}
  },
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

function Dropdown({
  name, label, control, register, error, onChange, className
}) {
  const classes = useStyles();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={props => (
        <FormControl className={classes.formControl}>
          <InputLabel id="label">{label}</InputLabel>
          <Select
            ref={register}
            fullWidth
            label={label}
            variant="filled"
            defaultValue={1}
            // className={clsx(classes.textField, className)}
            onChange={e => {
              props.onChange(e);
              onChange();
            }}
            error={!!error}
            helperText={error}
          >
            <MenuItem value={1}>Item 1</MenuItem>
            <MenuItem value={2}>Item 2</MenuItem>
            <MenuItem value={33}>Item 3</MenuItem>
          </Select>
        </FormControl>
      )}
    />
  );
}

export default Dropdown;