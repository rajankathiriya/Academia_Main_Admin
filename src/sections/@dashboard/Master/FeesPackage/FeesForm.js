import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const FeesForm = (props) => {
  const [open, setOpen] = useState(false);
  // const [course, setcourse] = useState([]);
  const [data, setdata] = useState({
    name: '',
    as1: '',
    as2: '',
  });

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    // --------------------------API----------------------------
    axios.post('https://academia-master-api.onrender.com/api/categories', data).then((r) => {
      props.changeEdit(r.data._id);
    });
    setdata((e.target.value = ''));
    setOpen(props.handleClose);
  };

  // useEffect(() => {
  //   axios.get('https://desert-sand-reindeer-wrap.cyclic.app/api/course').then((r) => {
  //     const d = r.data.map((value, index) => {
  //       value.id = index + 1;
  //       return value;
  //     });
  //     setcourse(d);
  //   });
  // })

  // const handleDateChange = (date) => setState({ ...state, date });

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Fees Details
            </h4>
            <TextField
              type="text"
              name="name"
              id="standard-basic"
              value={data.name || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Fees Package Title* "
              validators={['required']}
            />
            <TextField
              type="text"
              name="as1"
              id="standard-basic"
              value={data.as1 || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Fees Package Title* "
              validators={['required']}
            />
            <TextField
              type="text"
              name="as2"
              id="standard-basic"
              value={data.as2 || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Fees Package Title* "
              validators={['required']}
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

export default FeesForm;
