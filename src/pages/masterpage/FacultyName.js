import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import axios from 'axios';
import { GridRowModes, DataGridPro, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FacultyNameDialog from '../../sections/@dashboard/Master/FacultyName/FacultyNameDialog';
import FacultyNameEditForm from '../../sections/@dashboard/Master/FacultyName/FacultyNameEditForm';

export default function FacultyName() {
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
        axios.delete(`https://academia-master-api.onrender.com/api/facultyname/${row.row._id}`).then((r) => {
          setRows(rows.filter((rowd) => rowd.id !== row.id));
        });
      }
    });
  };

  const columns = [
    { field: 'facultyname', headerName: 'Faculty Name', width: 200 },

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
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(row)} color="inherit" />,
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/facultyname').then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
      console.log(r);
    });
  }, [edit]);

  return (
    <>
      <Container className="mt-4">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Faculty
          </Typography>
          <FacultyNameDialog changeEdit={setEdit} />
        </Stack>
        {/* ==================(edit popop)======================================== */}

        <Dialog
          open={open}
          onClose={handleEditClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'New Faculty'}</DialogTitle>
          <DialogContent>
            <FacultyNameEditForm changeEdit={setEdit} handleEditClose={handleEditClose} editrow={editRow} />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleEditClose}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
        {/* ==================================================================== */}

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
