import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import { Button, Card, Container, Grid, CardActionArea, Typography, Stack, styled, Skeleton } from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import loadingimg from './img/loading.gif';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const Syllabus = () => {
  const storedData = JSON.parse(localStorage.getItem('facultyData'));
  const facName = storedData?.firstName;
  const role = storedData?.role;

  const [subData, setSubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Format the date to yyyy-MM-dd
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    axios
      .get('https://academia-master-api.onrender.com/api/subject')
      .then((r) => {
        let modifiedData = [];

        if (role === 'Admin') {
          // If role is Admin, set all data without filtering
          modifiedData = r.data.map((value, index) => {
            return { ...value, id: index + 1 };
          });
        } else {
          // For other roles, filter based on facName
          const filteredData = r.data.filter((value) => value.subteken === facName);
          modifiedData = filteredData.map((value, index) => {
            return { ...value, id: index + 1 };
          });
        }

        setSubData(modifiedData);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setLoading(false); // Ensure loading is set to false in case of an error
        console.error('Error fetching data:', error);
      });
  }, [facName, role]); // Include role in the dependency array

  const [isEditActive, setIsEditActive] = useState(false); // New state variable
  const [rows, setRows] = useState([]);
  const [Drows, DsetRows] = useState([]);
  const [Nrows, NsetRows] = useState([]);
  const [edit, setEdit] = useState(null);
  const [Dedit, DsetEdit] = useState(null);
  const [Nedit, NsetEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState({
    subject: '',
    description: '',
    assbig: '',
    asspdf: null,
    duedate: '',
  });
  const [Drivedata, setDrivedata] = useState({
    subject: '',
    drivelink: '',
    drivename: '',
  });
  const [Noticedata, setNoticeData] = useState({
    subject: '',
    notice: '',
    noticebig: '',
  });

  const handleClickOpen = (index) => {
    setOpen(true);
    setActiveIndex(index);
    setIsEditActive(false); // Reset the state when a new card is clicked
    setData({
      subject: subData[index].subject,
    });
    setDrivedata({
      subject: subData[index].subject,
    });
    setNoticeData({
      subject: subData[index].subject,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
    setDrivedata({ ...Drivedata, [e.target.name]: e.target.value });
    setNoticeData({ ...Noticedata, [e.target.name]: e.target.value });
  };
  const handleChangeasspdf = (e) => {
    // Handle file input change correctly
    setData({ ...data, asspdf: e.target.files[0] });
  };
  // ============================================================================

  const columns = [
    { field: 'subject', headerName: 'subject', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'assbig', headerName: 'Assignment', width: 130 },
    { field: 'asspdf', headerName: 'PDF name', width: 130 },
    { field: 'duedate', headerName: 'Due date', width: 130 },
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
  const Dcolumns = [
    { field: 'subject', headerName: 'subject', width: 130 },
    { field: 'drivename', headerName: 'Drive Name', width: 130 },
    { field: 'drivelink', headerName: 'Drive Link', width: 130 },
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
            onClick={() => DhandleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => DhandleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const Ncolumns = [
    { field: 'subject', headerName: 'subject', width: 130 },
    { field: 'notice', headerName: 'description ', width: 230 },
    { field: 'noticebig', headerName: 'notice ', width: 350 },
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
            onClick={() => NhandleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => NhandleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  // ============================================================================

  const handleSubmit = (e) => {
    const formdata = new FormData();

    Object.keys(data).forEach((key) => {
      formdata.append(key, data[key]);
    });

    e.preventDefault();
    axios.post('https://academia-master-api.onrender.com/api/subassignment', formdata).then((r) => {
      setEdit(r.data._id);
      refresh();
    });
  };

  const handleDriveSubmit = (e, index) => {
    e.preventDefault();
    axios.post('https://academia-master-api.onrender.com/api/subdrive', Drivedata).then((r) => {
      DsetEdit(r.data._id);
      Drefresh();
    });
  };

  const handleNoticeSubmit = (e) => {
    e.preventDefault();
    axios.post('https://academia-master-api.onrender.com/api/subnotice', Noticedata).then((r) => {
      NsetEdit(r.data._id);
      Nrefresh();
    });
  };

  // ============================================================================

  const updateData = (e) => {
    axios.put(`https://academia-master-api.onrender.com/api/subassignment/${edit}`, data).then((r) => {
      console.log(r.data);
      setEdit(r.data._id);
      refresh();
    });
  };

  const DupdateData = (e) => {
    e.preventDefault();
    axios.put(`https://academia-master-api.onrender.com/api/subdrive/${Dedit}`, Drivedata).then((r) => {
      DsetEdit(r.data._id);
      Drefresh();
    });
  };

  const NupdateData = (e) => {
    e.preventDefault();
    axios.put(`https://academia-master-api.onrender.com/api/subnotice/${Nedit}`, Noticedata).then((r) => {
      console.log(r.data);
      NsetEdit(r.data._id);
      Nrefresh();
    });
  };
  // ============================================================================

  const handleDeleteClick = (row) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`https://academia-master-api.onrender.com/api/subassignment/${row.row._id}`).then(() => {
        setRows(rows.filter((rowd) => rowd.id !== row.id));
      });
    }
  };
  const DhandleDeleteClick = (row) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`https://academia-master-api.onrender.com/api/subdrive/${row.row._id}`).then(() => {
        DsetRows(Drows.filter((rowd) => rowd.id !== row.id));
      });
    }
  };
  const NhandleDeleteClick = (row) => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.delete(`https://academia-master-api.onrender.com/api/subnotice/${row.row._id}`).then(() => {
        NsetRows(Nrows.filter((rowd) => rowd.id !== row.id));
      });
    }
  };
  // ============================================================================

  const handleEditClick = (row) => {
    axios.get(`https://academia-master-api.onrender.com/api/subassignment/${row.row._id}`).then((r) => {
      setEdit(row.row._id);
      setData({
        subject: r.data.subject,
        assbig: r.data.assbig,
        description: r.data.description,
        duedate: r.data.duedate,
        asspdf: r.data.asspdf,
      });
    });
    setIsEditActive(true); // Set isEditActive to true when Edit is clicked
  };

  const DhandleEditClick = (row) => {
    axios.get(`https://academia-master-api.onrender.com/api/subdrive/${row.row._id}`).then((r) => {
      DsetEdit(row.row._id);
      setDrivedata({
        subject: r.data.subject,
        drivename: r.data.drivename,
        drivelink: r.data.drivelink,
      });
    });
    setIsEditActive(true); // Set isEditActive to true when Edit is clicked
  };

  const NhandleEditClick = (row) => {
    axios.get(`https://academia-master-api.onrender.com/api/subnotice/${row.row._id}`).then((r) => {
      NsetEdit(row.row._id);
      setNoticeData({
        subject: r.data.subject,
        notice: r.data.notice,
        noticebig: r.data.noticebig,
      });
    });
    setIsEditActive(true); // Set isEditActive to true when Edit is clicked
  };
  // ============================================================================

  const refresh = () => {
    axios.get(`https://academia-master-api.onrender.com/api/subassignment`).then((r) => {
      const data = r.data;
      const subjectName = subData[activeIndex].subject;
      const filteredData = data
        .filter((value) => value.subject === subjectName)
        .map((value, index) => {
          value.id = index + 1;
          return value;
        });
      setRows(filteredData);
    });
  };

  const Drefresh = () => {
    axios.get(`https://academia-master-api.onrender.com/api/subdrive`).then((r) => {
      const data = r.data;
      const subjectName = subData[activeIndex].subject;
      const filteredData = data
        .filter((value) => value.subject === subjectName)
        .map((value, index) => {
          value.id = index + 1;
          return value;
        });
      DsetRows(filteredData);
    });
  };

  const Nrefresh = () => {
    axios.get(`https://academia-master-api.onrender.com/api/subnotice`).then((r) => {
      const data = r.data;
      const subjectName = subData[activeIndex].subject;
      const filteredData = data
        .filter((value) => value.subject === subjectName)
        .map((value, index) => {
          value.id = index + 1;
          return value;
        });
      NsetRows(filteredData);
    });
  };

  // ============================================================================

  useEffect(() => {
    if (activeIndex !== null) {
      axios.get(`https://academia-master-api.onrender.com/api/subassignment`).then((r) => {
        const data = r.data;
        const subjectName = subData[activeIndex].subject;
        const filteredData = data
          .filter((value) => value.subject === subjectName)
          .map((value, index) => {
            value.id = index + 1;
            return value;
          });
        setRows(filteredData);
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      axios.get('https://academia-master-api.onrender.com/api/subdrive').then((r) => {
        const data = r.data;
        const subjectName = subData[activeIndex].subject;
        const filteredData = data
          .filter((value) => value.subject === subjectName)
          .map((value, index) => {
            value.id = index + 1;
            return value;
          });
        DsetRows(filteredData);
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      axios.get('https://academia-master-api.onrender.com/api/subnotice').then((r) => {
        const data = r.data;
        const subjectName = subData[activeIndex].subject;
        const filteredData = data
          .filter((value) => value.subject === subjectName)
          .map((value, index) => {
            value.id = index + 1;
            return value;
          });
        NsetRows(filteredData);
      });
    }
  }, [activeIndex]);

  return (
    <Container>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Subject
          </Typography>
        </Stack>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loadingimg} alt="" />
          </div>
        ) : (
          <Grid container spacing={3}>
            {subData.map((val, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ maxWidth: 530 }} onClick={() => handleClickOpen(index)}>
                    <CardActionArea>
                      {<CardMedia component="img" height="100" image={val.imgurl} alt="green iguana" /> || <Skeleton />}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {val.subject || <Skeleton />}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div" color="text.secondary">
                          <span>
                            <PersonIcon /> - {val.subteken || <Skeleton />}
                          </span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="pt-4 pb-4 sub-image">
          {activeIndex !== null ? subData[activeIndex].subject : ''}
        </DialogTitle>
        <DialogContent className="mt-5">
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Notice Board</Accordion.Header>
              <Accordion.Body>
                <Accordion.Body>
                  {activeIndex !== null ? (
                    <>
                      <ValidatorForm onSubmit={handleNoticeSubmit} onError={() => null} autoComplete="off">
                        <Grid container spacing={8}>
                          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                              disabled
                              style={{ display: 'none' }}
                              type="text"
                              name="subject"
                              value={Noticedata.subject}
                              onChange={handleChange}
                              errorMessages={['this field is required']}
                              validators={['required']}
                            />
                            <TextField
                              type="text"
                              name="notice"
                              value={Noticedata.notice}
                              onChange={handleChange}
                              errorMessages={['this field is required']}
                              label="description"
                              validators={['required']}
                            />
                            <textarea
                              required
                              rows="5"
                              className="w-100 p-2 "
                              onChange={handleChange}
                              name="noticebig"
                              value={Noticedata.noticebig || ''}
                              placeholder="Enter Your notice..."
                            />
                          </Grid>
                        </Grid>

                        <div className="container">
                          <div className="row">
                            <div className="col-sm-4 mb-2">
                              <Button
                                color="error"
                                variant="contained"
                                type="button"
                                fullWidth
                                onClick={() => {
                                  setNoticeData({
                                    notice: '',
                                    noticebig: '',
                                  });
                                }}
                              >
                                <DeleteIcon />
                                <span>Clear</span>
                              </Button>
                            </div>
                            <div className="col-sm-4 mb-2">
                              <Button color="primary" variant="contained" type="submit" fullWidth>
                                <SendIcon />
                                <span>Submit</span>
                              </Button>
                            </div>
                            {activeIndex !== null ? (
                              <>
                                {/* ... (rest of the code remains the same) */}
                                {isEditActive && ( // Only show the Update button when isEditActive is true
                                  <div className="col-sm-4 mb-2">
                                    <Button
                                      color="success"
                                      variant="contained"
                                      type="button"
                                      fullWidth
                                      onClick={NupdateData}
                                    >
                                      <SendIcon />
                                      <span>Update</span>
                                    </Button>
                                  </div>
                                )}
                              </>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </ValidatorForm>

                      <div className="mt-5 mb-5" style={{ height: '400px' }}>
                        <DataGrid
                          rows={Nrows}
                          columns={Ncolumns}
                          pageSize={5}
                          rowsPerPageOptions={[10]}
                          checkboxSelection
                        />
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </Accordion.Body>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Assignment</Accordion.Header>
              <Accordion.Body>
                {activeIndex !== null ? (
                  <>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
                      <Grid container spacing={8}>
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                          <TextField
                            disabled
                            style={{ display: 'none' }}
                            type="text"
                            name="subject"
                            value={data.subject}
                            onChange={handleChange}
                            errorMessages={['this field is required']}
                            validators={['required']}
                          />
                          <TextField
                            type="text"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            errorMessages={['this field is required']}
                            label="Assignment description"
                            validators={['required']}
                          />

                          <TextField
                            type="date"
                            name="duedate"
                            label="Assignment Due Date"
                            InputLabelProps={{ shrink: true }}
                            value={data.duedate || ''}
                            onChange={handleChange}
                            validators={['required']}
                            inputProps={{ min: currentDate }} // Set the minimum date as the current date
                            errorMessages={['this field is required']}
                          />

                          <textarea
                            required
                            rows="5"
                            className="w-100 p-2 "
                            onChange={handleChange}
                            name="assbig"
                            value={data.assbig || ''}
                            placeholder="Enter Your Assignment..."
                          />

                          <input
                            className="mt-3"
                            type="file"
                            name="asspdf"
                            id="img-input"
                            onChange={handleChangeasspdf}
                          // Remove the value prop for file inputs
                          />
                        </Grid>
                      </Grid>

                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4 mb-2">
                            <Button
                              color="error"
                              variant="contained"
                              type="button"
                              fullWidth
                              onClick={() => {
                                setData({
                                  name: '',
                                  assbig: '',
                                  description: '',
                                  duedate: '',
                                  asspdf: '',
                                });
                              }}
                            >
                              <DeleteIcon />
                              <span>Clear</span>
                            </Button>
                          </div>
                          <div className="col-sm-4 mb-2">
                            <Button color="primary" variant="contained" type="submit" fullWidth>
                              <SendIcon />
                              <span>Submit</span>
                            </Button>
                          </div>
                          {activeIndex !== null ? (
                            <>
                              {isEditActive ? ( // Only show the Update button when isEditActive is true
                                <div className="col-sm-4 mb-2">
                                  <Button
                                    color="success"
                                    variant="contained"
                                    type="button"
                                    fullWidth
                                    onClick={() => {
                                      updateData();
                                      setIsEditActive(false); // Set isEditActive to false after successful update
                                    }}
                                  >
                                    <SendIcon />
                                    <span>Update</span>
                                  </Button>
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </div>
                    </ValidatorForm>

                    <div className="mt-5 mb-5" style={{ height: '400px' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Google Drive</Accordion.Header>
              <Accordion.Body>
                {activeIndex !== null ? (
                  <>
                    <ValidatorForm onSubmit={handleDriveSubmit} onError={() => null} autoComplete="off">
                      <Grid container spacing={8}>
                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                          <TextField
                            disabled
                            // style={{ display: 'none' }}
                            type="text"
                            name="subject"
                            style={{ display: 'none' }}
                            value={Drivedata.subject}
                            onChange={handleChange}
                            errorMessages={['this field is required']}
                            validators={['required']}
                          />
                          <TextField
                            type="text"
                            name="drivename"
                            value={Drivedata.drivename}
                            onChange={handleChange}
                            errorMessages={['this field is required']}
                            label="Drive Name"
                            validators={['required']}
                          />
                          <TextField
                            type="text"
                            name="drivelink"
                            value={Drivedata.drivelink}
                            onChange={handleChange}
                            errorMessages={['this field is required']}
                            label="Drive Link"
                            validators={['required']}
                          />
                        </Grid>
                      </Grid>

                      <div className="container">
                        <div className="row">
                          <div className="col-sm-4 mb-2">
                            <Button
                              color="error"
                              variant="contained"
                              type="button"
                              fullWidth
                              onClick={() => {
                                setDrivedata({
                                  drivelink: '',
                                  drivename: '',
                                });
                              }}
                            >
                              <DeleteIcon />
                              <span>Clear</span>
                            </Button>
                          </div>
                          <div className="col-sm-4 mb-2">
                            <Button color="primary" variant="contained" type="submit" fullWidth>
                              <SendIcon />
                              <span>Submit</span>
                            </Button>
                          </div>
                          {activeIndex !== null ? (
                            <>
                              {/* ... (rest of the code remains the same) */}
                              {isEditActive && ( // Only show the Update button when isEditActive is true
                                <div className="col-sm-4 mb-2">
                                  <Button
                                    color="success"
                                    variant="contained"
                                    type="button"
                                    fullWidth
                                    onClick={DupdateData}
                                  >
                                    <SendIcon />
                                    <span>Update</span>
                                  </Button>
                                </div>
                              )}
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </ValidatorForm>

                    <div className="mt-5 mb-5" style={{ height: '400px' }}>
                      <DataGrid
                        rows={Drows}
                        columns={Dcolumns}
                        pageSize={5}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Syllabus;
