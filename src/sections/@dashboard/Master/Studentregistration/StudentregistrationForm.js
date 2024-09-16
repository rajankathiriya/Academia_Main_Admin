import { Button, Grid, IconButton, InputAdornment, MenuItem, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import Iconify from '../../../../components/iconify';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const FacultyregistrationForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get('https://academia-master-api.onrender.com/api/students')
      .then((response) => {
        const studentData = response.data.map((student) => ({
          label: student.name,
          _id: student._id,
          email: student.email,
          password: student.password,
          studentmobile: student.studentmobile,
          fees: student.fees,
          gender: student.gender,
        }));
        setOptions(studentData);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, []);
  const [open, setOpen] = useState(false);

  const [data, setdata] = useState({
    dumID: '',
    fees: '',
    gender: '',
    name: '',
    email: '',
    password: '',
    studentmobile: '',
  });

  const handleNameChange = (event, newValue) => {
    const selectedStudent = options.find((student) => student.label === newValue);

    if (selectedStudent) {
      setdata({
        ...data,
        dumID: selectedStudent._id,
        fees: selectedStudent.fees,
        gender: selectedStudent.gender,
        name: newValue,
        email: selectedStudent.email,
        studentmobile: selectedStudent.studentmobile,
      });
    }
  };

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://aacademia-api-login.onrender.com/api/studentregistration', data)
      .then((r) => {
        props.changeEdit(r.data._id);
        toast('Sign up successful...');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
    setOpen(props.handleClose);

    setdata({
      name: '',
      email: '',
      password: '',
      studentmobile: '',
    });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Student Registration Form
            </h4>
            <Autocomplete
              disablePortal
              name="name"
              options={options.map((option) => option.label)}
              onChange={handleNameChange}
              value={data.name}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />

            <TextField
              name="studentmobile"
              type="number"
              label="student Mobile"
              value={data.studentmobile}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={data.email}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              autoComplete="off"
              errorMessages={['Email is required', 'Email is not valid']}
            />
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Password"
              value={data.password}
              onChange={handleChange}
              errorMessages={['This field is required']}
              validators={['required', 'minStringLength:8', 'maxStringLength: 15']}
            />
          </Grid>
        </Grid>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <Button
                color="error"
                variant="contained"
                type="button"
                fullWidth
                onClick={() => {
                  setdata({
                    name: '',
                    email: '',
                    password: '',
                    studentmobile: '',
                  });
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

export default FacultyregistrationForm;
