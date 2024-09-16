import React from 'react';
import {
  Button,
  Container,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Session from './masterpage/Session';

const Master = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const myNav = useNavigate();
  const subjectpage = () => {
    myNav('/subject');
  };
  const admpage = () => {
    myNav('/adm');
  };

  const questiontype = () => {
    myNav('/questiontype');
  };

  const studentregistration = () => {
    myNav('/studentregistration');
  };
  const facultyname = () => {
    myNav('/facultyname');
  };
  const category = () => {
    myNav('/category');
  };
  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Master
        </Typography>

        <div className="row">
          <div className="col-sm-4 my-2">
            <Button
              style={{ color: 'white', backgroundColor: '#2B3499' }}
              variant="contained"
              type="submit"
              onClick={subjectpage}
              fullWidth
            >
              <span> Subject</span>
            </Button>
          </div>
          <div className="col-sm-4 my-2">
            <Button
              style={{ color: 'white', backgroundColor: '#2B3499' }}
              variant="contained"
              type="submit"
              onClick={facultyname}
              fullWidth
            >
              <span> Faculty Name</span>
            </Button>
          </div>
          <div className="col-sm-4 my-2">
            <Button
              style={{ color: 'white', backgroundColor: '#2B3499' }}
              variant="contained"
              type="submit"
              onClick={admpage}
              fullWidth
            >
              <span> Admin Registration</span>
            </Button>
          </div>
        </div>
        <hr />
        <div className="row ">
          {/* <div className="col-sm-4 my-2">
            <Button
              style={{ color: 'white', backgroundColor: '#3876BF' }}
              variant="contained"
              type="submit"
              onClick={questiontype}
              fullWidth
            >
              <span> Question type</span>
            </Button>
          </div> */}

          <div className="col-sm-4 my-2">
            <Button
              style={{ color: 'white', backgroundColor: '#3876BF' }}
              variant="contained"
              type="submit"
              onClick={handleClickOpen}
              fullWidth
            >
              <span> session time</span>
            </Button>
          </div>
        </div>
        <hr />
        <div className="row ">
          <div className="col-sm-4 my-2">
            <Button color="primary" variant="contained" type="submit" onClick={studentregistration} fullWidth>
              <span> Student Registration</span>
            </Button>
          </div>
          {/* <div className="col-sm-4 my-2">
            <Button color="primary" variant="contained" type="submit" onClick={category} fullWidth>
              <span> Category</span>
            </Button>
          </div> */}
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          // fullScreen
          fullWidth
          maxWidth="xs"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Session handleClose={handleClose} />
          </DialogContent>
          <DialogActions>
            <Button className="btn btn-outline-danger" onClick={handleClose}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Master;
