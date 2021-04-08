import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import Input from '../../components/Input';
import Radio from '../../components/Radio';
import Checkbox from '../../components/Checkbox';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useOnBoardingContext } from './OnBoardingContext';

const useStyles = makeStyles((theme) => ({
  radioGroup: {
    paddingLeft: theme.spacing(4)
  },
  btnContainer: {
    marginTop: 12,
    marginBottom: 73,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
}));

const schema = yup.object().shape({
  fieldFirst: yup.number()
    .typeError("This field must be a number")
    .required("This field is required")
    .positive()
    .integer()
    .min(0, "Min is 0")
    .max(9, "max is 9"),
  fieldSecond: yup.number()
    .typeError("This field must be a number")
    .required("This field is required")
    .positive()
    .integer()
    .min(0, "Min is 0")
    .max(9, "max is 9"),
  fieldThird: yup.number()
    .typeError("This field must be a number")
    .required("This field is required")
    .positive()
    .integer()
    .min(0, "Min is 0")
    .max(9, "max is 9"),
  fieldFourth: yup.number()
    .typeError("This field must be a number")
    .required("This field is required")
    .positive()
    .integer()
    .min(0, "Min is 0")
    .max(9, "max is 9"),
  name: yup.string().required('Name is required'),
  email: yup.string().required('E-mail is required').email(),
  address: yup.string().required('Address is required'),
  radioFirst: yup.string().required('This field is required'),
  idScreen: yup.array().typeError('This field is required').min(1, 'This field is required'),
});

function OnBoardingStep1({
  moveStepTwo
}) {
  const classes = useStyles();

  const [showCheckbox, setShowCheckbox] = React.useState(false);

  const { control, register, setValue, trigger, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const { setValues } = useOnBoardingContext();

  const onSubmit = (formData) => {
    setValues(formData);
    moveStepTwo();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box mt={7.75} />
          <Typography variant="body2">
            <b>Subheading 1</b>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="fieldFirst"
            label="Field 1"
            control={control}
            register={register}
            error={errors.fieldFirst?.message}
            onChange={() => trigger("fieldFirst")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="fieldSecond"
            label="Field 2"
            control={control}
            register={register}
            error={errors.fieldSecond?.message}
            onChange={() => trigger("fieldSecond")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="fieldThird"
            label="Field 3"
            control={control}
            register={register}
            error={errors.fieldThird?.message}
            onChange={() => trigger("fieldThird")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="fieldFourth"
            label="Field 4"
            control={control}
            register={register}
            error={errors.fieldFourth?.message}
            onChange={() => trigger("fieldFourth")}
          />
        </Grid>
        <Grid item xs={12}>
          <Box mt={4.75} />
          <Typography variant="body2">
            <b>Subheading 2</b>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="name"
            label="Name"
            control={control}
            register={register}
            error={errors.name?.message}
            onChange={() => trigger("name")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="email"
            label="E-mail"
            control={control}
            register={register}
            error={errors.email?.message}
            onChange={() => trigger("email")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            name="address"
            label="Address"
            control={control}
            register={register}
            error={errors.address?.message}
            onChange={() => trigger("address")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl
            component="fieldset"
            error={!!errors.radioFirst?.message}
          >
            <Typography variant="body2">
              <b>Subheading 4</b>
            </Typography>
            <Controller
              name="radioFirst"
              control={control}
              as={RadioGroup}
              defaultValue=""
              row
            >
              <Radio
                onChange={() => setShowCheckbox(true)}
                value="yes"
                label="Yes"
              />
              <Radio
                onChange={() => setShowCheckbox(false)}
                value="no"
                label="No"
              />
            </Controller>
            <FormHelperText>{errors.radioFirst?.message}</FormHelperText>
          </FormControl>
          {
            showCheckbox &&
            <FormControl className={classes.radioGroup} component="fieldset">
              <Typography variant="body2">
                <b>Subheading 5</b>
              </Typography>
              <FormGroup row>
                <Checkbox
                  name="checkboxYes"
                  label="Yes"
                  control={control}
                />
                <Checkbox
                  name="checkboxNo"
                  label="No"
                  control={control}
                />
              </FormGroup>
            </FormControl>
          }
        </Grid>
        <Grid item xs={12}>
          <Box mt={4.75} />
          <Typography variant="body2">
            <b>Upload your ID</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            error={!!errors.idScreen?.message}
            style={{
              display: 'block'
            }}
          >
            <FileInput
              name="idScreen"
              control={control}
              register={register}
              setValue={setValue}
              onChange={() => trigger("idScreen")}
            />
            <FormHelperText>{errors.idScreen?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid
          item xs={12}
          className={classes.btnContainer}
        >
          <Button text="SUBMIT" />
        </Grid>
      </Grid>
    </form>
  );
}

export default OnBoardingStep1;