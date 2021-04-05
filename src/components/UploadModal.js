import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@material-ui/icons/Cancel';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FileInput from './FileInput';
import UploadedItem from './UploadedItem';
import Button from './Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '560px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '71px 44.56px 67.38px 44.56px',
    position: 'relative',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    '&:focus': {
      outline: 'none'
    }
  },
  modalTitle: {
    color: '#25282B',
    fontSize: '20px',
    lineHeight: '20px',
    fontWeight: 'bold',
    marginBottom: '22px',
  },
  modalDescription: {
    color: '#25282B',
    opacity: 0.5,
    width: '263px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '28px',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '0 97.32px',
    justifyContent: 'space-between',
    marginTop: '55px',
  },
  sbmtButton: {
    width: '130.12px',
    height: '47.87px',
  },
  cancelButton: {
    backgroundColor: '#C8C8C8',
    width: '130.12px',
    height: '47.87px',
    '&:hover': {
      backgroundColor: '#C8C8C8',
      opacity: 0.7
    }
  },
  closeButton: {
    position: 'absolute',
    top: '40px',
    right: '40px',
    width: '25px',
    height: '25px',
    opacity: 0.2,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.1,
    }
  }
}));

export default function UploadModal({control, register, setValue, trigger, open, setOpen}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.closeButton} onClick={handleClose}>
              <CancelIcon />
            </div>
            <div className={classes.heading}>
              <div className={classes.modalTitle}>Upload PCNs</div>
              <div className={classes.modalDescription}>Please upload your PCN files for each reporting month.</div>
            </div>
            <FileInput
              height={158}
              name="idScreen"
              control={control}
              register={register}
              setValue={setValue}
              onChange={() => trigger("idScreen")}
              withoutThumbs={true}
            />
            <div className={classes.itemsContainer}>
              <UploadedItem />
              <UploadedItem />
              <UploadedItem />
              <UploadedItem />

              <UploadedItem isLast />
            </div>
            <div className={classes.buttonsContainer}>
              <Button className={classes.sbmtButton} text="Submit" />
              <Button className={classes.cancelButton} text="Cancel" />
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
