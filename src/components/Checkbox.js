import React from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Controller } from 'react-hook-form';

function Checkbox({
  name, label, control
}) {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={false}
          render={props => (
            <MaterialCheckbox
              onChange={e => props.onChange(e.target.checked)}
              color="primary"
            />
          )}
        />
      }
      label={label}
    />
  );
}

export default Checkbox;