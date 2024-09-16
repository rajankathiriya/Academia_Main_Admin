import { Button, Checkbox, FormControlLabel, Grid, Icon, MenuItem, Radio, RadioGroup, styled } from '@mui/material';
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

const SubjectForm = (props) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/facultyname').then((r) => {
      setRows(r.data);
    });
  }, []);
  const [open, setOpen] = useState(false);

  const [data, setdata] = useState({
    subject: '',
    subteken: '',
    imgurl: '',
  });

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --------------------------API----------------------------
    axios.post('https://academia-master-api.onrender.com/api/subject', data).then((r) => {
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
              Subject Details
            </h4>
            <TextField
              type="text"
              name="subject"
              id="standard-basic"
              value={data.subject || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Subject "
              validators={['required']}
            />

            <TextField
              select
              value={data.subteken || ''}
              variant="filled"
              onChange={handleChange}
              name="subteken"
              helperText="Subject teken by"
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
              label="image "
              select
              value={data.imgurl || ''}
              variant="filled"
              onChange={handleChange}
              name="imgurl"
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>
                https://static.vecteezy.com/system/resources/thumbnails/003/323/638/small/flat-teachers-day-background-free-vector.jpg
              </option>
              <option>https://img.freepik.com/free-vector/hand-drawn-back-school-background_23-2149464866.jpg</option>
              <option>
                https://img.freepik.com/premium-vector/set-back-school-doodle-flat-style-this-flat-design-illustration-embraces-minimalism_198565-8434.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1698537600&semt=ais
              </option>
              <option>
                https://media.istockphoto.com/id/613125288/vector/cute-back-to-school-background-with-students-and-pupils-attributes.jpg?s=612x612&w=0&k=20&c=-Vw8L7nR9sq_ZVC249Q0X6dHKkLNp58aBTAWL9HAhP0=
              </option>

              <option>
                https://img.freepik.com/premium-vector/flat-back-school-background_23-2149041745.jpg?w=2000
              </option>
            </TextField>

            {/* <TextField
              type="text"
              name="imgurl"
              id="standard-basic"
              value={data.imgurl || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="image URL "
              validators={['required']}
            /> */}
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

export default SubjectForm;
