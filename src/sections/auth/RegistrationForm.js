import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import Iconify from '../../components/iconify';

// components

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));
// ----------------------------------------------------------------------

export default function RegistrationForm() {
  const navi = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [CshowPassword, setCShowPassword] = useState(false);

  const [data, setdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    confirmPassword: '',
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/facultyname').then((r) => {
      setRows(r.data);
    });
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== data.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [data.password]);

  const handleChange = (e) => {
    // e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://aacademia-api-login.onrender.com/api/facultyregistration', data)
      .then((e) => {
        console.log(data);
        navi('/login');
        toast('Sign up successfully...');
      })
      .catch(() => {
        toast('Something wrong...');
      });
    setdata((e.target.value = ''));
  };

  // const handleClick = () => {
  //   navigate('/dashboard', { replace: true });
  // };

  return (
    <>
      <Stack spacing={3}>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                select
                value={data.firstName || ''}
                variant="filled"
                onChange={handleChange}
                name="firstName"
                validators={['required']}
                errorMessages={['this field is required']}
                SelectProps={{
                  native: 'true',
                }}
              >
                {rows.map((val, index) => {
                  return (
                    <>
                      <option key={index}>{val.facultyname}</option>
                    </>
                  );
                })}
              </TextField>

              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={data.lastName || ''}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                value={data.email || ''}
                onChange={handleChange}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Role"
                select
                variant="filled"
                value={data.role || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
                name="role"
                SelectProps={{
                  native: 'true',
                }}
              >
                <option />
                <option>Admin</option>
                <option>Faculty</option>
              </TextField>
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
                value={data.password || ''}
                onChange={handleChange}
                errorMessages={['this field is required']}
                validators={['required', 'minStringLength:6', 'maxStringLength: 15']}
              />

              <TextField
                type={CshowPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setCShowPassword(!CshowPassword)} edge="end">
                        <Iconify icon={CshowPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="confirmPassword"
                onChange={handleChange}
                label="Confirm Password"
                value={data.confirmPassword || ''}
                validators={['required', 'isPasswordMatch']}
                errorMessages={['this field is required', "password didn't match"]}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit" className="w-100">
            Submit
          </Button>
        </ValidatorForm>
      </Stack>
    </>
  );
}
