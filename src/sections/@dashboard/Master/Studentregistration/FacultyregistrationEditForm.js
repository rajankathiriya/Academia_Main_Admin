import { Button, Checkbox, FormControlLabel, Grid, Icon, Radio, Autocomplete, styled, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import { toast } from 'react-toastify';

const Course = [
  'Basic Grammar-5000',
  'CCC-4000',
  'CCC With Advance Tally-12500',
  'Data Science (Python and ML)-35000',
  'Full Stack Development-31000',
  'Full Stack Development (MERN)-40000',
  'IELTS-10000',
  'IELTS Advance-17000',
  'Programming C & C++-10000',
  'Programming in C-5000',
  'Programming in C++-5000',
  'Python-10000',
  'Smart Pro. NET-25000',
  'Spoken-5000',
  'Spoken English-10000',
  'Spoken English (8500) -8500',
  'Spoken English (9000)-9000',
  'Spoken+CCC-14000',
  'Spoken+CCC+ Tally-20500',
  'Spoken+ Tally-16500',
  'Tally ERP 9-6500',
  'Tally Prime-9000',
  'Tally+CCC-10500',
];

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const FacultyregistrationEditForm = (props) => {
  const [open, setOpen] = useState(false);

  const [data, setdata] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    course: [],
  });
  useEffect(() => {
    setdata({ ...props.editrow.row });
  }, [props.editrow.row]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== data.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [data.password]);

  const handleChange = (e) => {
    e.persist();
    // setdata({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === 'course') {
      const mydata = data.hobbies;

      if (e.target.select) {
        mydata.push(e.target.value);
        setdata({ ...data, hobbies: mydata });
      } else {
        const mydata1 = mydata.filter((val) => {
          return val !== e.target.value;
        });
        setdata({ ...data, hobbies: mydata1 });
      }
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    axios.put(`https://desert-sand-reindeer-wrap.cyclic.app/api/facultyregistration/${data._id}`, data).then((r) => {
      setOpen(props.handleEditClose);
      props.changeEdit(r.data._id);
    });

    setdata((e.target.value = ''));
  };

  const dat = () => {
    const d = new Date(data.birthdate);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Faculty Registration Form
            </h4>
            <TextField
              type="text"
              name="name"
              id="standard-basic"
              value={data.name || ''}
              onChange={handleChange}
              errorMessages={['Name is required']}
              validators={['required']}
              label="Name* "
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={data.email || ''}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              autoComplete="off"
              errorMessages={['Email is required', 'email is not valid']}
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              value={data.password || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Password is required']}
            />

            <TextField
              label="role"
              select
              variant="filled"
              value={data.role || ''}
              onChange={handleChange}
              name="role"
              validators={['required']}
              errorMessages={['Role is required']}
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>Faculty</option>
              <option>Admin</option>
            </TextField>

            <Autocomplete
              multiple
              id="tags-standard"
              options={Course}
              value={data.course}
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => (
                <MenuItem key={option} value={data.option} sx={{ justifyContent: 'space-between' }} {...props}>
                  {option}
                  {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
              )}
              onChange={(event, value) => setdata({ ...data, course: value })} // prints the selected value
              renderInput={(params) => <TextField {...params} variant="outlined" />}
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
                <span> Submit</span>
              </Button>
            </div>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default FacultyregistrationEditForm;
