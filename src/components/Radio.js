import React from 'react';
import MaterialRadio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Radio({
  label, value, onChange
}) {
  return (
    <FormControlLabel
      value={value}
      control={
        <MaterialRadio
          color="primary"
          onChange={onChange}
        />
      }
      label={label}
    />
  );
}

export default Radio;