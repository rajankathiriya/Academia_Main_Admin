import { Button, Grid, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const FacultyNameEditForm = (props) => {
  console.log(props.editrow.row);

  const [open, setOpen] = useState(false);

  const [data, setdata] = useState({
    facultyname: '',
  });

  useEffect(() => {
    setdata({ ...props.editrow.row });
  }, [props.editrow.row]);

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    // --------------------------API----------------------------
    axios.put(`https://academia-master-api.onrender.com/api/facultyname/${data._id}`, data).then((r) => {
      props.changeEdit(r.data._id);
      setOpen(props.handleEditClose);
    });

    setdata((e.target.value = ''));
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autocomplete="off">
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="facultyname"
              id="standard-basic"
              value={data.facultyname || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Faculty Name "
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
                <span>Add Item</span>
              </Button>
            </div>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default FacultyNameEditForm;
