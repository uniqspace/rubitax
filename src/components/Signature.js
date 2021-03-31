import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SignatureCanvas from 'react-signature-canvas';

const useStyles = makeStyles((theme) => ({
  sigPanel: {
    position: 'relative'
  },
  sigPad: {
    width: '100%',
    height: 323,
    background: '#FBF8F8',
  },
  clearBtn: {
    position: 'absolute',
    bottom: 24,
    right: 27,
    color: '#FFFFFF',
    background: '#E6E3E3',
    border: 'none',
    boxShadow: 'none',
    borderRadius: 3,
    padding: '11px 36px'
  }
}));

function Signature(props) {
  const classes = useStyles();
  let sigPad = useRef(null);

  const clear = () => {
    sigPad.clear()
  }

  return (
    <div className={classes.sigPanel}>
      <SignatureCanvas
        penColor='black'
        canvasProps={{className: classes.sigPad}}
        ref={(ref) => sigPad = ref}
      />
      <Button
        variant="contained"
        className={classes.clearBtn}
        onClick={clear}
      >clear</Button>
    </div>
  );
}

export default Signature;