import * as React from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';
import StudentQuery from '../sections/@dashboard/StudentQuery/StudentQuery';
import StudentQuery2 from '../sections/@dashboard/StudentQuery/StudentQuery2';

export default function StudentQuerypage() {
  const storedData = JSON.parse(localStorage.getItem('facultyData'));

  // Define the component to render based on the condition
  let selectedQuery = null;
  if (storedData && storedData.role) {
    selectedQuery = storedData.role === 'Admin' ? <StudentQuery /> : <StudentQuery2 />;
  }

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Student Help Desk
          </Typography>
        </Stack>
        {/* ==================(edit popup)======================================== */}
        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          {selectedQuery}
        </Card>
      </Container>
    </>
  );
}
