import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import {
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// components

// sections

export default function Adminpage() {
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [editRow, seteditRew] = useState({});

  // ========================================================
  const [open, setOpen] = React.useState(false);
  const handleEditClick = (id) => () => {
    seteditRew(id);
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
  };
  // ========================================================
  const myNav = useNavigate();

  const backhome = () => {
    myNav('/dashboard/master');
  };
  const admin = () => {
    myNav('/registration');
  };
  const handleDeleteClick = (row) => () => {
    Swal.fire({
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`https://academia-master-api.onrender.com/api/facultyregistrations/${row.row._id}`).then((r) => {
          setRows(rows.filter((rowd) => rowd.id !== row.id));
        });
      }
    });
  };

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 160 },
    { field: 'lastName', headerName: 'Last Name', width: 160 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'role', headerName: 'role', width: 160 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (row) => {
        return [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(row)} color="inherit" />,
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get('https://aacademia-api-login.onrender.com/api/facultyregistration').then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
    });
  }, [edit]);

  return (
    <>
      <Container className="mt-4">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Admin
          </Typography>
          <div>
            <Button variant="contained" onClick={backhome} className="me-3">
              <ArrowBackIcon />
            </Button>
            <Button variant="contained" onClick={admin}>
              Add New
            </Button>
          </div>
        </Stack>

        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} checkboxSelection />
        </Card>
      </Container>
    </>
  );
}
