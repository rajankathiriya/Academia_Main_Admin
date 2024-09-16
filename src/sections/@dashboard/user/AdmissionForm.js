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
  TextareaAutosize,
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

const AdmissionForm = (props) => {
  const [subject, setsubject] = useState([]);

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/subject').then((r) => {
      setsubject(r.data);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [data, setdata] = useState({
    name: '',
    parentsname: '',
    birthdate: '',
    education: '',
    gender: '',
    email: '',
    studentmobile: '',
    parentmobile: '',
    whatsapp: '',
    fees: '',
    address: '',
    city: '',
    inquirydate: '',
    takenby: '',
    leadsource: '',
    course: '',
    marksheet: null,
    adhar: null,
    sphoto: null,
  });

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
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

  const handlechnageimg = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;
    setdata({ ...data, [fieldName]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    // Assuming `data` is defined somewhere in your code
    Object.keys(data).forEach((key) => {
      formdata.append(key, data[key]);
    });

    // API call using Axios
    axios
      .post('https://academia-master-api.onrender.com/api/students', formdata)
      .then((response) => {
        console.log('Registration successful.');
        console.log(formdata);

        props.changeEdit(response.data._id);
        setOpen(props.handleClose);
      })
      .catch((error) => {
        console.error('Error occurred during registration:', error);
        toast.error('Failed to submit the form. Please try again.');
        // Handle the error state or show a notification to the user
      });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={8}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Student Details
            </h4>

            <TextField
              type="text"
              name="name"
              id="standard-basic"
              value={data.name || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Student Name "
              validators={['required']}
            />

            <TextField
              type="text"
              name="parentsname"
              label="Parents Name"
              onChange={handleChange}
              value={data.parentsname || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              name="birthdate"
              label="Birth Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={data.birthdate || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
            />
            <TextField
              type="text"
              name="education"
              value={data.education || ''}
              label="Education"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <RadioGroup row name="gender" sx={{ mb: 2 }} value={data.gender || ''} onChange={handleChange}>
              <FormControlLabel value="Male" label="Male" labelPlacement="end" control={<Radio color="secondary" />} />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>
          </Grid>
          {/* ================================================================================== */}

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Student Contact Details
            </h4>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={data.email || ''}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <TextField
              type="number"
              name="studentmobile"
              value={data.studentmobile || ''}
              label="Student Mobile Nubmer"
              onChange={handleChange}
              validators={['required', 'maxStringLength: 10', 'minStringLength: 10']}
              errorMessages={[
                'this field is required',
                'The card number must be 10 digits',
                'The card number must be 10 digits',
              ]}
            />
            <TextField
              type="number"
              name="parentmobile"
              value={data.parentmobile || ''}
              label="Parent Mobile Nubmer"
              onChange={handleChange}
              validators={['required', 'maxStringLength: 10', 'minStringLength: 10']}
              errorMessages={[
                'this field is required',
                'The card number must be 10 digits',
                'The card number must be 10 digits',
              ]}
            />
            <TextField
              type="number"
              name="whatsapp"
              value={data.whatsapp || ''}
              label="Whatsapp Nubmer"
              onChange={handleChange}
              validators={['required', 'maxStringLength: 10', 'minStringLength: 10']}
              errorMessages={[
                'this field is required',
                'The card number must be 10 digits',
                'The card number must be 10 digits',
              ]}
            />

            <TextareaAutosize
              name="address"
              aria-label="empty textarea"
              onChange={handleChange}
              validators={['required']}
              value={data.address || ''}
              minRows={3}
              placeholder="Address..."
              style={{ width: '100%' }}
            />
            <TextField
              type="text"
              name="city"
              value={data.city || ''}
              label="City"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>

          {/* ================================================================================== */}

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Admission Details
            </h4>
            <TextField
              name="inquirydate"
              label="Admission Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={data.inquirydate || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextField
              label="Taken By"
              select
              variant="filled"
              value={data.takenby || ''}
              helperText="Please Select your taken BY"
              onChange={handleChange}
              name="takenby"
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>Counsellor Vadodara</option>
              <option>Counsellor Aanand</option>
              <option>Counsellor Ahmedabad</option>
              <option>Counsellor Bhavnagar</option>
            </TextField>

            <TextField
              label="Lead Source "
              select
              value={data.leadsource || ''}
              variant="filled"
              helperText="Please Select your lead source"
              onChange={handleChange}
              name="leadsource"
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>Discount Coupon</option>
              <option>Facebook</option>
              <option>Google</option>
              <option>Just Dial</option>
              <option>News Paper</option>
              <option>Reference</option>
              <option>Other</option>
            </TextField>

            <Autocomplete
              multiple
              id="tags-standard"
              options={subject.map((val) => {
                return val.subject;
              })}
              value={data.course || []} // Ensure it's an array or set a default empty array
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => (
                <MenuItem key={option} value={option} sx={{ justifyContent: 'space-between' }} {...props}>
                  {option}
                  {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
              )}
              onChange={(event, value) => setdata({ ...data, course: value || [] })} // Ensure value is an array or default empty array
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
            <TextField
              type="number"
              name="fees"
              value={data.fees || ''}
              label="Fees"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Documents
            </h4>
            <TextField
              name="sphoto"
              label="Student Photo"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handlechnageimg}
            />

            <TextField
              name="adhar"
              label="Aadhar card"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handlechnageimg}
            />

            <TextField
              name="marksheet"
              label="Previous year marksheet"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handlechnageimg}
            />
          </Grid>
        </Grid>

        <Button
          color="error"
          className="mx-2"
          variant="contained"
          type="submit"
          onClick={() => {
            setdata('');
          }}
        >
          <DeleteIcon />
          <span> Clear</span>
        </Button>

        <Button color="primary" className="mx-2" variant="contained" type="submit">
          <SendIcon />
          <span> Submit</span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default AdmissionForm;
