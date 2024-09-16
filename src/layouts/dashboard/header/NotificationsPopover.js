import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import {
  Box,
  List,
  Badge,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListSubheader,
  Button,
  Grid,
  styled,
} from '@mui/material';
import Iconify from '../../../components/iconify';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

export default function NotificationsPopover() {
  const [facName, setfacName] = useState([]);

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/facultyname').then((r) => {
      setfacName(r.data);
    });
  }, []);
  const [open, setOpen] = useState(null);
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const [data, setdata] = useState({
    name: '',
    notice: '',
  });

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'notice', headerName: 'notice', width: 130 },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (row) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/notifications').then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
    });
  }, [edit]);

  const handleEditClick = (row) => {
    axios.get(`https://academia-master-api.onrender.com/api/notifications/${row.row._id}`).then((r) => {
      setEdit(row.row._id);
      setdata({
        name: r.data.name,
        notice: r.data.notice,
      });
    });
  };

  const handleDeleteClick = (row) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`https://academia-master-api.onrender.com/api/notifications/${row.row._id}`).then(() => {
        setRows(rows.filter((rowd) => rowd.id !== row.id));
      });
    }
  };

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://academia-master-api.onrender.com/api/notifications', data).then((r) => {
      setEdit(r.data._id);
    });
    setdata({
      name: '',
      notice: '',
    });
  };
  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 640,
          },
        }}
      >
        {/* <div style={{ border: '5px solid #2065d1' }}> */}
        <div>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">
                <h4 className=" p-2 rounded-2 mb-3 text-center" style={{ backgroundColor: '#e8f0fe' }}>
                  Notifications
                </h4>
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <div className="p-3">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
              <Grid container spacing={8}>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    select
                    value={data.name || ''}
                    variant="filled"
                    onChange={handleChange}
                    name="name"
                    SelectProps={{
                      native: 'true',
                    }}
                  >
                    {facName.map((val, index) => {
                      return (
                        <>
                          <option key={index}>{val.facultyname}</option>
                        </>
                      );
                    })}
                  </TextField>
                  <textarea
                    required
                    rows="5"
                    className="w-100 p-2 "
                    onChange={handleChange}
                    name="notice"
                    value={data.notice || ''}
                    placeholder="Enter Your notice..."
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
          <div className="mt-5 mb-5" style={{ height: '400px' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} checkboxSelection />
          </div>
        </div>
      </Popover>
    </>
  );
}
