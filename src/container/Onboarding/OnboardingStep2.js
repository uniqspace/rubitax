import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import SinglePagePDFViewer from '../../components/pdf/SinglePage';
import Signature from '../../components/Signature';
import Button from '../../components/Button';

import samplePDF from '../../assets/Service_Pages_Income_tax_itc2279a6.pdf';

const useStyles = makeStyles((theme) => ({
  pdfViewer: {
    marginTop: 66
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

function OnboardingStep2(props) {
  const classes = useStyles();
  return (
    <>
      <SinglePagePDFViewer className={classes.pdfViewer} pdf={samplePDF} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box mt={4.75} />
          <Typography variant="body2">
            <b>Put your signature here</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Signature />
        </Grid>
        <Grid
          item xs={12}
          className={classes.btnContainer}
        >
          <Button text="SIGN" />
        </Grid>
      </Grid>
    </>
  );
}

export default OnboardingStep2;