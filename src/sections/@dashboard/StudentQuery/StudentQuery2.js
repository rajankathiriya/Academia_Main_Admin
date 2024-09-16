import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import { Card } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { DataGridPremium, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid-premium';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function StudentQuery2() {
  const storedData = JSON.parse(localStorage.getItem('facultyData'));
  const facName = storedData?.firstName;
  const role = storedData?.role;

  const [subData, setSubData] = useState([]);
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    axios
      .get('https://academia-master-api.onrender.com/api/subject')
      .then((r) => {
        const filteredData = r.data.filter((value) => value.subteken === facName);
        const modifiedData = filteredData.map((value, index) => {
          return { ...value, id: index + 1 };
        });

        setSubData(modifiedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [facName]);

  const handleDeleteClick = (row) => () => {
    Swal.fire({
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://academia-master-api.onrender.com/api/studentquery/${row.row._id}`).then((r) => {
          setRows(rows.filter((rowd) => rowd.id !== row.id));
        });
      }
    });
  };

  const columns = [
    { field: 'studentname', headerName: 'Student Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'Phone', headerName: 'Phone', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'query', headerName: 'Query', width: 200 },

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
    axios.get('https://academia-master-api.onrender.com/api/studentquery').then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });

      // Filter the rows based on subjects matching the modifiedData
      const filteredRows = d.filter((row) => subData.some((subject) => subject.subject === row.subject));
      setRows(filteredRows);
    });
  }, [edit, subData]);
  return (
    <div style={{ height: 300, width: '100%' }}>
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
    </div>
  );
}
