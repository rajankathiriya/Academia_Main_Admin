import { Button, Grid, TextareaAutosize, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import './Speech.css';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const StudentQueryForm = (props) => {
  const [open, setOpen] = useState(false);

  const [data, setdata] = useState({
    studentname: '',
    email: '',
    Phone: '',
    query: '',
  });

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --------------------------API----------------------------
    Swal.fire({
      title: 'Do you want to Send the Query?',
      showCancelButton: true,
      confirmButtonText: 'Send',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Query Send..👍', '', 'success');
        console.log(data);
        axios.post('', data).then((r) => {
          console.log(r);
        });
      }
    });

    setdata((e.target.value = ''));
    setOpen(props.handleClose);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autocomplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="studentname"
              id="standard-basic"
              value={data.studentname || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Name "
              validators={['required']}
            />
            <div className="row">
              <div className="col-sm">
                <TextField
                  type="email"
                  name="email"
                  id="standard-basic"
                  value={data.email || ''}
                  onChange={handleChange}
                  errorMessages={['this field is required']}
                  label="Email "
                  validators={['required']}
                />
              </div>
              <div className="col-sm">
                <TextField
                  type="number"
                  name="Phone"
                  id="standard-basic"
                  value={data.Phone || ''}
                  onChange={handleChange}
                  errorMessages={['this field is required']}
                  label="Phone No "
                  validators={['required', 'maxStringLength: 10']}
                />
              </div>
            </div>
            <textarea
              required
              rows="5"
              className="w-100 p-2 "
              onChange={handleChange}
              name="query"
              value={data.query || ''}
              placeholder="Enter Your Query..."
            />
          </Grid>
        </Grid>

        <div className="container">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <Button
                color="error"
                variant="contained"
                type="submit"
                fullWidth
                onClick={() => {
                  setdata('');
                }}
              >
                <DeleteIcon />
                <span> Clear</span>
              </Button>
            </div>
            <div className="col-sm-6 mb-2">
              <Button color="primary" variant="contained" type="submit" fullWidth>
                <SendIcon />
                <span> Send</span>
              </Button>
            </div>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default StudentQueryForm;
