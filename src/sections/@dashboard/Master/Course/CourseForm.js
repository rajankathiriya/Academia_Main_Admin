import { Button, Checkbox, FormControlLabel, Grid, Icon, Radio, RadioGroup, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import { toast } from 'react-toastify';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const CourseForm = (props) => {
  const [open, setOpen] = useState(false);

  const [data, setdata] = useState({
    course: '',
    coursefees: '',
    year: '',
    type: '',
  });
  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    // --------------------------API----------------------------
    axios.post('https://desert-sand-reindeer-wrap.cyclic.app/api/course', data).then((r) => {
      console.log(r.data);
      props.changeEdit(r.data._id);
    });
    setdata((e.target.value = ''));
    setOpen(props.handleClose);
  };

  // const handleDateChange = (date) => setState({ ...state, date });

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Course Details
            </h4>
            <TextField
              type="text"
              name="course"
              id="standard-basic"
              value={data.course || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Course* "
              validators={['required']}
            />
            <TextField
              type="number"
              name="coursefees"
              id="standard-basic"
              value={data.coursefees || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Course Fees "
              validators={['required']}
            />

            <TextField
              type="text"
              name="year"
              id="standard-basic"
              value={data.year || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Academic Year "
              validators={['required']}
            />

            <TextField
              label="Type"
              select
              variant="filled"
              value={data.type || ''}
              onChange={handleChange}
              name="type"
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>Onsite (Learning in classroom) </option>
              <option>Online (Online Learning)</option>
            </TextField>
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
                <span> Submit</span>
              </Button>
            </div>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default CourseForm;
