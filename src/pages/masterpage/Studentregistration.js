import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// components

import StudentregiDialog from '../../sections/@dashboard/Master/Studentregistration/StudentregiDialog';

export default function Studentregistration() {
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

  const handleDeleteClick = (row) => () => {
    Swal.fire({
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`https://academia-master-api.onrender.com/api/studentregistrations/${row.row._id}`).then((r) => {
          setRows(rows.filter((rowd) => rowd.id !== row.id));
        });
      }
    });
  };

  const columns = [
    { field: 'name', headerName: 'Name/ID', width: 200, renderCell: (params) => params.value.label },
    { field: 'studentmobile', headerName: 'student mobile No', width: 350 },
    { field: 'email', headerName: 'Email', width: 350 },
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
    axios.get('https://aacademia-api-login.onrender.com/api/studentregistration').then((r) => {
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
            Student Registration Form
          </Typography>
          <StudentregiDialog changeEdit={setEdit} />
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
