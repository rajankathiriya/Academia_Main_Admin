import Swal from 'sweetalert2';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SubjectForm from './SubjectForm';

const SubjectDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  // const [row, setRows] = useState([]);
  const nav = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleDeleteClick = (row) => () => {
  //     Swal.fire({
  //         title: 'Do you want to Delete?',
  //         showCancelButton: true,
  //         confirmButtonText: 'Delete',
  //     }).then((result) => {
  //         /* Read more about isConfirmed, isDenied below */
  //         if (result.isConfirmed) {

  //             axios.delete('https://desert-sand-reindeer-wrap.cyclic.app/api/subject').then((r) => {

  //             });
  //         }
  //     });
  // };

  const handleClose = () => {
    setOpen(false);
  };
  const backhome = () => {
    nav('/dashboard/master');
  };

  return (
    <div>
      <Button variant="contained" onClick={backhome} className="me-3">
        <ArrowBackIcon />
      </Button>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New
      </Button>
      {/* <Button variant="contained" className='bg-danger mx-2' onClick={handleDeleteClick(row)}>
                Delete All
            </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        // fullScreen
        fullWidth
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <SubjectForm changeEdit={props.changeEdit} handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button className="btn btn-outline-danger" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubjectDialog;
