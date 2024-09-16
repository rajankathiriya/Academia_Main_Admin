import { Button, Grid, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import { toast } from 'react-toastify';

const TextField = styled(TextValidator)({
  width: '100%',
  marginBottom: '16px',
});

const Session = (props) => {
  const [data, setdata] = useState({
    _id: '655863f6b0280874f2494fbe',
    session: null,
  });
  const [show, setshow] = useState([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/session').then((r) => {
      setshow(r.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.session) {
        // If data.session has a value, make a PUT request
        const response = await axios.put(`https://academia-master-api.onrender.com/api/session/${data._id}`, data);
        toast.success('Data updated successfully');
      } else {
        // If data.session is empty, make a POST request
        const response = await axios.post('https://academia-master-api.onrender.com/api/session', data);
        console.log(response.data);
        toast.success('Data created successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error processing request');
    } finally {
      setOpen(props.handleClose);
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              session time
            </h4>
            {show.map((val, index) => {
              return (
                <small className="p-1" style={{ backgroundColor: '#ffe7d9' }} key={index}>
                  curront session is {val.session} min
                </small>
              );
            })}
            <TextField
              className="mt-3"
              type="number"
              name="session"
              id="standard-basic"
              value={data.session || ''}
              onChange={handleChange}
              errorMessages={['This field is required']}
              label="Session Time"
              validators={['required']}
            />
          </Grid>
        </Grid>

        <div className="container">
          <Button color="primary" variant="contained" type="submit" fullWidth>
            <SendIcon />
            <span> Submit</span>
          </Button>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default Session;
