import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdmissionForm from './AdmissionForm';

export default function AdmissionDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New Admission
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // fullScreen
        fullWidth
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Student/Trainee/Lead Info'}</DialogTitle>
        <DialogContent>
          <AdmissionForm changeEdit={props.changeEdit} handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
