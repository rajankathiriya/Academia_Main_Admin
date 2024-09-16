import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { Stack, IconButton, InputAdornment, styled, Button, CircularProgress } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import Iconify from '../../components/iconify';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post('https://aacademia-api-login.onrender.com/api/facultysignin', data);
      localStorage.setItem('facultyData', JSON.stringify(response.data));
      toast('Login successful');
      const storedData = JSON.parse(localStorage.getItem('facultyData'));
      if (storedData && storedData.role) {
        if (storedData.role === 'Admin') {
          navigate('/dashboard/counsellorDB');
        } else {
          navigate('/dashboard/subject');
        }
      }
      window.location.reload();

      const admName = (storedData && storedData.firstName) || 'John Doe';
      const message = new SpeechSynthesisUtterance(`${admName} Welcome to Academia`);
      window.speechSynthesis.speak(message);
    } catch (error) {
      toast('Invalid Username/Password');
    } finally {
      setLoading(false); // Set loading to false when login attempt completes
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
          <TextField
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            errorMessages={['This field is required']}
            validators={['required']}
            label="Email address"
          />

          <TextField
            name="password"
            label="Password"
            value={data.password || ''}
            onChange={handleChange}
            errorMessages={['This field is required']}
            validators={['required']}
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
          />
          <Button fullWidth size="large" type="submit" variant="contained">
            {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
          </Button>
        </ValidatorForm>
      </Stack>


    </>
  );
}
