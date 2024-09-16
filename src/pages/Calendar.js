import * as React from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';
import ReactBigCalendar from '../sections/@dashboard/FullCalendar/ReactBigCalendar';

export default function Calendar() {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Event calendar
          </Typography>
        </Stack>
        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <ReactBigCalendar />
        </Card>
      </Container>
    </>
  );
}
