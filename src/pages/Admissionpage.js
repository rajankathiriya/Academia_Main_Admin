import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import PrintIcon from '@mui/icons-material/Print';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import { Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { DataGridPremium, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-premium';
import AdmissionEditForm from '../sections/@dashboard/user/AdmissionEditForm';
import StudentDetailed from '../sections/@dashboard/user/StudentDetailed';
import AdmissionDialog from '../sections/@dashboard/user/AdmissionDialog';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Admissionpage() {
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [editRow, seteditRew] = useState({});
  const [userdet, setuserdet] = useState({});

  // ========================================================
  const [open, setOpen] = React.useState(false);
  const handleEditClick = (id) => () => {
    seteditRew(id);
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
  };

  const [openuserDetail, setOpenuserDetail] = React.useState(false);
  const handleShowClick = (id) => () => {
    setuserdet(id.row._id);
    setOpenuserDetail(true);
  };

  const handleShowClose = () => {
    setOpenuserDetail(false);
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
        axios.delete(`https://academia-master-api.onrender.com/api/students/${row.row._id}`).then((r) => {
          setRows(rows.filter((rowd) => rowd.id !== row.id));
        });
      }
    });
  };

  const columns = [
    { field: 'name', headerName: 'Student name', width: 130 },
    { field: 'parentsname', headerName: 'Parents name', width: 130 },
    { field: 'studentmobile', headerName: 'Student Mobile-No', width: 150 },
    { field: 'parentmobile', headerName: 'Parents Mobile-No', width: 150 },
    { field: 'whatsapp', headerName: 'Whatsapp No', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'fees', headerName: 'Fees', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'education', headerName: 'Education', width: 150 },
    { field: 'inquirydate', headerName: 'Inquiry Date', width: 200 },
    { field: 'takenby', headerName: 'Taken By', width: 200 },
    { field: 'course', headerName: 'Course', width: 200 },
    { field: 'leadsource', headerName: 'Lead Source', width: 150 },

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
          <GridActionsCellItem
            icon={<PrintIcon />}
            label="Print"
            className="textPrimary"
            onClick={handleShowClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(row)} color="inherit" />,
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get('https://academia-master-api.onrender.com/api/students').then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
    });
  }, [edit]);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Admissions
          </Typography>
          <AdmissionDialog changeEdit={setEdit} />
        </Stack>
        {/* ==================(edit popop)======================================== */}
        <Dialog
          open={open}
          onClose={handleEditClose}
          // fullScreen
          fullWidth
          maxWidth="lg"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Question & Answer'}</DialogTitle>
          <DialogContent>
            {/* ============================================================================= */}

            <AdmissionEditForm changeEdit={setEdit} handleEditClose={handleEditClose} editrow={editRow} />

            {/* ============================================================================= */}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleEditClose}>
              Back{' '}
            </Button>
          </DialogActions>
        </Dialog>

        {/* =========================(student info )==================================================== */}

        <Dialog
          open={openuserDetail}
          onClose={handleShowClose}
          // fullScreen
          fullWidth
          maxWidth="lg"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Student Info'}</DialogTitle>
          <DialogContent>
            {/* ============================================================================= */}

            <StudentDetailed handleShowClose={handleShowClose} userdet={userdet} />

            {/* ============================================================================= */}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleShowClose}>
              Back
            </Button>
          </DialogActions>
        </Dialog>
        {/* ========================================================================== */}
        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <DataGridPremium
            rows={rows}
            columns={columns}
            slots={{
              toolbar: CustomToolbar,
            }}
          />
        </Card>
      </Container>
    </>
  );
}
